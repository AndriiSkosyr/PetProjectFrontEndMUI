import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignIn() {
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [alertType, setAlertType] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const navigate = useNavigate(); // For redirect

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    // Validate email format
    if (!validateEmail(email)) {
      setAlertMessage('Invalid email format');
      setAlertType('error');
      return;
    }

    // Call ClientLogin and handle success/fail
    const result = await ClientLogin(email, password);
    if (result.success) {
      setFormData({ email: '', password: '' });
      setAlertMessage('Login successful!');
      setAlertType('success');
      if (rememberMe) {
        localStorage.setItem('userToken', result.data.token); // Store token in localStorage
      }
      setTimeout(() => {
        navigate('/home'); // Redirect to home after successful login
      }, 1000);
    } else {
      setAlertMessage('Invalid credentials');
      setAlertType('error');
    }
  };

  const ClientLogin = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        body: JSON.stringify({
          clientEmail: email,
          clientPassword: password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
  
      // Handle specific status codes
      if (response.status === 200) {
        const jsonResponse = await response.json();
  
        // Save clientId to localStorage
        localStorage.setItem('clientId', jsonResponse['Client id']);
        console.log(localStorage)
  
        return { success: true, data: jsonResponse };
      } 
      else if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.Message || "Bad request.");
      } 
      else if (response.status === 401) {
        const errorData = await response.json();
        throw new Error(errorData.Message || "Unauthorized access. Incorrect username or password.");
      } 
      else {
        throw new Error(`Unexpected error: ${response.status}`);
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>

          {alertMessage && <Alert severity={alertType} sx={{ width: '100%', mt: 2 }}>{alertMessage}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
            <Grid container>
              <Grid item>
                <Link href="/Sign-up" variant="body2">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Andrii Skosyr, '}
      {new Date().getFullYear()}{'.'}
    </Typography>
  );
}

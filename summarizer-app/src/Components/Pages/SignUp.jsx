import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert'; // Import Alert component
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Andrii Skosyr Pet Project, '}
      <Link color="inherit" href="https://mui.com/"></Link>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = React.useState({ firstName: '', lastName: '', email: '', password: '' });
  const [alertMessage, setAlertMessage] = React.useState(null); // For success or error messages
  const [alertType, setAlertType] = React.useState(''); // Type of alert: "success" or "error"

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('firstName') + data.get('lastName');
    const email = data.get('email');
    const password = data.get('password');

    // Call ClientRegister and handle success/fail
    const result = await ClientRegister(name, email, password);
    if (result.success) {
      // Clear form on success
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
      setAlertMessage('Registration successful!'); // Show success alert
      setAlertType('success');
    } else {
      setAlertMessage(`Registration failed: ${result.error}`); // Show error alert
      setAlertType('error');
    }
  };

  const ClientRegister = async (name, email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/client", {
        method: "POST",
        body: JSON.stringify({
          clientName: name,
          clientEmail: email,
          clientPassword: password,
          clientId: Math.floor(Math.random() * 10),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const jsonResponse = await response.json();
      return { success: true, data: jsonResponse };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          {alertMessage && (
            <Alert severity={alertType} sx={{ width: '100%', mt: 2 }}>
              {alertMessage}
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName} // Bind to state
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName} // Bind to state
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email} // Bind to state
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password} // Bind to state
                  onChange={handleChange}
                />
              </Grid>              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

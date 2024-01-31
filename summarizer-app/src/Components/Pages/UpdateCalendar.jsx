import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

const defaultTheme = createTheme();

export default function UpdateCalendar() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const timeout = (delay) => {
        return new Promise(res => setTimeout(res, delay));
    }

    const handleCheckboxChange = (event) => {
        setIsCheckboxChecked(event.target.checked);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        UpdateCalendars(data.get('calendarName'), data.get('clientEvent'));
        await timeout(1000);
        navigate("/")
    };

    const UpdateCalendars = async (calendarName, clientEvent) => {
        const requestOptions = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ calendarId: id, calendarName: calendarName, clientEvent: clientEvent })
        }
        const response = await fetch("http://127.0.0.1:5000/calendar", requestOptions);
        const data = await response.json();
        console.log(data);
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: "15vh",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: '75vh'
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Update calendar
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="calendarName"
                            label="Calendar name"
                            name="calendarName"
                            autoComplete="CalendarName"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="clientEvent"
                            label="Client event"
                            name="clientEvent"
                            autoComplete="ClientEvent"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={isCheckboxChecked} onChange={handleCheckboxChange} value="remember" color="primary" />}
                            label="Confirm"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!isCheckboxChecked}
                        >
                            Update Calendar
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
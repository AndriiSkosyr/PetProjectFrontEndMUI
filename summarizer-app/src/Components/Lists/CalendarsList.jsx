import { Box, Button, ButtonGroup, Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const CalendarsList = () => {

    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [CalendarsArray, setCalendars] = useState([]);

    useEffect(() => {
        ReadCalendars();
    }, []);

    const ReadCalendars = async () => {
        await fetch("http://127.0.0.1:5000/calendar", {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                setCalendars(response)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const DeleteCalendars = async (calendarId) => {
        const requestOptions = {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ calendarId: calendarId })
        }
        const response = await fetch("http://127.0.0.1:5000/calendar", requestOptions);
        const data = await response.json();
        console.log(data);
        ReadCalendars();
    }

    return (
        <>
            <Box>
                <Card variant="outlined"
                    sx={{
                        minHeight: '40vh',
                        minWidth: '30vh',
                        margin: '2rem',
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                    <Typography variant="subtitle1">Calendars</Typography>
                    <List>
                        {CalendarsArray.map(item => {
                            return <ListItem key={item.CalendarId} id={item.CalendarId}>
                                <ListItemButton onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                    <ListItemText primary={item.CalendarName} />
                                    <Box sx={{ display: isHovered ? 'flex' : 'none' }}>
                                        <EditIcon fontSize="small" onClick={() => { navigate(`/UpdateCalendar/${item.CalendarId}`) }} sx={{ marginRight: "1vw" }} />
                                        <DeleteIcon fontSize="small" onClick={() => { DeleteCalendars(item.CalendarId) }} />
                                    </Box>
                                </ListItemButton>
                            </ListItem>
                        })}
                    </List>
                    <Box
                        sx={{
                            marginTop: "auto",
                            marginBottom: '2vh',
                            marginLeft: '2vh',
                            marginRight: '2vh',
                            display: "flex"
                        }}>
                        <ButtonGroup disableElevation fullWidth="true" variant="outlined" aria-label="outlined primary button group">
                            <Button component={Link} to={`/AddCalendar`} color="success">Add Calendar</Button>
                        </ButtonGroup>
                    </Box>
                </Card>

            </Box>
        </>
    )
}

export default CalendarsList;
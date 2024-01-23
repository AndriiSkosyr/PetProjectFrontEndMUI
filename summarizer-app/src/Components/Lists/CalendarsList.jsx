import { Box, Button, ButtonGroup, Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect } from "react";

const CalendarsList = () => {
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

    const CreateCalendars = async () => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ calendarName: "testPOST", calendarId: "1" })
        }
        const response = await fetch("http://127.0.0.1:5000/calendar", requestOptions);
        const data = await response.json();
        console.log(data);
    }

    const UpdateCalendars = async () => {
        const requestOptions = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ calendarName: "testPUT", calendarId: "1" })
        }
        const response = await fetch("http://127.0.0.1:5000/calendar", requestOptions);
        const data = await response.json();
        console.log(data);
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
                            return <ListItem>
                                <ListItemButton onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                    <ListItemText id={item.CalendarId} primary={item.CalendarName} />
                                    <Box sx={{ display: isHovered ? 'flex' : 'none' }}>
                                        <EditIcon fontSize="small" onClick={() => { UpdateCalendars() }} sx={{ marginRight: "1vw" }} />
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
                            <Button color="success" onClick={() => { CreateCalendars() }}>Add Calendar</Button>
                        </ButtonGroup>
                    </Box>
                </Card>

            </Box>
        </>
    )
}

export default CalendarsList;
import { Box, Button, ButtonGroup, Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const CalendarsList = () => {

    const navigate = useNavigate();
    const [CalendarsArray, setCalendars] = useState([]);
    const [hoveredCalendarId, setHoveredCalendarId] = useState(null);

    useEffect(() => {
        ReadCalendars();
    }, []);

    const ReadCalendars = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/calendar", {
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            const data = await response.json();
            setCalendars(data);
        } catch (err) {
            console.error(err.message);
            alert("Failed to fetch calendars");
        }
    };

    const DeleteCalendar = async (calendarId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/calendar`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ calendarId })
            });
            if (response.ok) {
                setCalendars(prev => prev.filter(c => c.CalendarId !== calendarId)); // Update state directly
                alert("Calendar deleted successfully");
            } else {
                alert("Failed to delete calendar");
            }
        } catch (err) {
            console.error(err);
            alert("Error occurred while deleting");
        }
    };
    

    return (
        <>
            <Box>
                <Card variant="outlined"
                    sx={{
                        minHeight: { xs: '20vh', sm: '30vh', md: '40vh' },
                        minWidth: { xs: '20vh', sm: '25vh', md: '30vh' },
                        margin: '2rem',
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                    <Typography variant="subtitle1">Calendars</Typography>
                    <List>
                        {CalendarsArray.map(item => {
                            return <ListItem key={item.CalendarId} id={item.CalendarId}>
                                <ListItemButton onMouseEnter={() => setHoveredCalendarId(item.CalendarId)} onMouseLeave={() => setHoveredCalendarId(null)}>
                                    <ListItemText primary={item.CalendarName} />
                                    <Box sx={{ display: hoveredCalendarId === item.CalendarId ? 'flex' : 'none' }}>
                                        <EditIcon fontSize="small" onClick={() => { navigate(`/UpdateCalendar/${item.CalendarId}`) }} sx={{ marginRight: "1vw" }} />
                                        <DeleteIcon fontSize="small" onClick={() => { DeleteCalendar(item.CalendarId) }} />
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
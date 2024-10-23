import { Box, Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router";


const EventsList = () => {

    const navigate = useNavigate();
    const [EventsArray, setEvents] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        ReadEvents();
    }, []);

    const ReadEvents = async () => {
        await fetch("http://127.0.0.1:5000/event", {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                setEvents(response)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const DeleteEvent = async (eventId) => {
        const requestOptions = {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId: eventId })
        }
        const response = await fetch("http://127.0.0.1:5000/event", requestOptions);
        const data = await response.json();
        console.log(data);
        ReadEvents();
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
                    <Typography variant="subtitle1">Recent events</Typography>
                    <List>
                        {EventsArray.map(item => {
                            return <ListItem key={item.EventId} id={item.EventId}>
                                <ListItemButton onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                    <ListItemText primary={item.EventName} />
                                    <Box sx={{ display: isHovered ? 'flex' : 'none' }}>
                                        <EditIcon fontSize="small" onClick={() => { navigate(`/UpdateEvent/${item.EventId}`) }} sx={{ marginRight: "1vw" }} />
                                        <DeleteIcon fontSize="small" onClick={() => { DeleteEvent(item.EventId) }} />
                                    </Box>
                                </ListItemButton>
                            </ListItem>
                        })}
                    </List>
                </Card>
            </Box>
        </>
    )
}

export default EventsList;
import { Box, Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const EventsList = () => {
    const [EventsArray, setEvents] = useState([]);

    useEffect(() => {
        GetEvents();
    }, []);

    const GetEvents = async () => {
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

    return (
        <>
            <Box>
                <Card variant="outlined"
                    sx={{
                        height: '40vh',
                        margin: '2rem',
                        textAlign: "center",
                    }}>
                    <Typography variant="subtitle1">Recent events</Typography>
                    <List>
                        {EventsArray.map(item => {
                            return <ListItem>
                                <ListItemButton component="a" href="#">
                                    <ListItemText id={item.EventId} primary={item.EventName} />
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
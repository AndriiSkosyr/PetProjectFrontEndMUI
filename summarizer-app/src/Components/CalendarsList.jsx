import { Box, Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const CalendarsList = () => {
    const [CalendarsArray, setCalendars] = useState([]);

    useEffect(() => {
        GetCalendars();
    },[]);

    const GetCalendars = async () => {
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

    return (
        <>
            <Box>
                <Card variant="outlined"
                sx={{
                    height: '40vh',
                    margin: '2rem',
                    textAlign: "center",
                }}>
                    <Typography variant="subtitle1">Calendars</Typography>
                    <List>
                        {CalendarsArray.map(item => {
                            return <ListItem>
                                <ListItemButton component="a" href="#">
                                    <ListItemText id={item.CalendarId} primary={item.CalendarName}/>
                                </ListItemButton>
                            </ListItem>
                        })}
                    </List>
                </Card>
            </Box>
        </>
    )
}

export default CalendarsList;
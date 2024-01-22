import { Box, Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const MeetingsList = () => {
    const [MeetingsArray, setMeetings] = useState([]);

    useEffect(() => {
        GetMeetings();
    },[]);

    const GetMeetings = async () => {
        await fetch("http://127.0.0.1:5000/meeting", {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                setMeetings(response)
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
                    <Typography variant="subtitle1">Recent meetings</Typography>
                    <List>
                        {MeetingsArray.map(item => {
                            return <ListItem>
                                <ListItemButton component="a" href="#">
                                    <ListItemText id={item.MeetingId} primary={item.MeetingName}/>
                                </ListItemButton>
                            </ListItem>
                        })}
                    </List>
                </Card>
            </Box>
        </>
    )
}

export default MeetingsList;
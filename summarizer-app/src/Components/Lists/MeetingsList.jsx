import { Box, Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const MeetingsList = () => {

    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [MeetingsArray, setMeetings] = useState([]);

    useEffect(() => {
        ReadMeetings();
    },[]);

    const ReadMeetings = async () => {
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

    const DeleteMeeting = async (meetingId) => {
        const requestOptions = {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ meetingId: meetingId })
        }
        const response = await fetch("http://127.0.0.1:5000/meeting", requestOptions);
        const data = await response.json();
        console.log(data);
        ReadMeetings();
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
                    <Typography variant="subtitle1">Recent meetings</Typography>
                    <List>
                        {MeetingsArray.map(item => {
                            return <ListItem key={item.MeetingId} id={item.MeetingId}>
                                <ListItemButton onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                    <ListItemText primary={item.MeetingName} />
                                    <Box sx={{ display: isHovered ? 'flex' : 'none' }}>
                                        <EditIcon fontSize="small" onClick={() => { navigate(`/UpdateMeeting/${item.MeetingId}`) }} sx={{ marginRight: "1vw" }} />
                                        <DeleteIcon fontSize="small" onClick={() => { DeleteMeeting(item.MeetingId) }} />
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

export default MeetingsList;
import React from "react";
import { Grid } from "@mui/material";
import ListCard from "./ListCard";
import GoogleCalendar from "./GoogleCalendar";

const Home = () => {
    return (
        <Grid container spacing={2} sx={{ padding: '2rem' }}>
            <Grid item xs={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ListCard 
                            title="Calendars"
                            fetchUrl="http://127.0.0.1:5000/calendar"
                            deleteUrl="http://127.0.0.1:5000/calendar"
                            addLink="/AddCalendar"
                            itemIdKey="CalendarId"
                            itemNameKey="CalendarName"
                            updateLinkBase="/UpdateCalendar"
                        />
                    </Grid>                    
                    <Grid item xs={12}>
                        <ListCard 
                            title="Recent meetings"
                            fetchUrl="http://127.0.0.1:5000/meeting"
                            deleteUrl="http://127.0.0.1:5000/meeting"
                            addLink="/AddMeeting"
                            itemIdKey="MeetingId"
                            itemNameKey="MeetingName"
                            updateLinkBase="/UpdateMeeting"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
                <GoogleCalendar />
            </Grid>
        </Grid>
    );
};

export default Home;
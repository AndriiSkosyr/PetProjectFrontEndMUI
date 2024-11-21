import React from "react";
import { Grid } from "@mui/material";
import ListCard from "./ListCard";
import GoogleCalendar from "./GoogleCalendar";

const Home = () => {
    return (
        <Grid container spacing={2} sx={{ height: '100vh', margin: 0, padding: 0 }}>
            <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={2} sx={{ flex: 1 }}>
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
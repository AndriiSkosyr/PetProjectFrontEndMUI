import React from "react";
import { Grid } from "@mui/material";
import CalendarsList from "./Lists/CalendarsList"
import EventsList from "./Lists/EventsList";
import MeetingsList from "./Lists/MeetingsList";

const Home = () => {
    return (
        <>
        {/* Grid layout for home page */}
            <Grid container>
                <Grid xs={3}>
                    <Grid container>
                        <Grid xs={12}><CalendarsList /></Grid>
                        <Grid xs={12}><EventsList /></Grid>
                        <Grid xs={12}><MeetingsList /></Grid>
                    </Grid>
                </Grid>
                <Grid xs={9}>
                    <Grid container>
                        <Grid xs={12}></Grid>
                        <Grid xs={12}></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;
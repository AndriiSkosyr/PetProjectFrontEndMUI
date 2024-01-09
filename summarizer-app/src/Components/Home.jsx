import React from "react";
import { Box, Grid } from "@mui/material";

const Home = () => {
    return (
        <Grid container>
            <Grid xs={3}>
                <Grid container rowSpacing={2}>
                    <Grid xs={12}><Box><h1>box1</h1></Box></Grid>
                    <Grid xs={12}><h1>list2</h1></Grid>
                    <Grid xs={12}><h1>list3</h1></Grid>
                </Grid>
            </Grid>
            <Grid xs={9}>
                <Grid container rowSpacing={2}> 
                    <Grid xs={12}><h1>calendar</h1></Grid>
                    <Grid xs={12}><h1>controls</h1></Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home;
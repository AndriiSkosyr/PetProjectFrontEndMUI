import { Box, Card, Typography } from "@mui/material";
import React from "react";

const MeetingsList = () => {
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
                </Card>
            </Box>
        </>
    )
}

export default MeetingsList;
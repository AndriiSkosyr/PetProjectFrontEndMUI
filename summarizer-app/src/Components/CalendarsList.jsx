import { Box, Card, Typography } from "@mui/material";
import React from "react";

const CalendarsList = () => {
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
                </Card>
            </Box>
        </>
    )
}

export default CalendarsList;
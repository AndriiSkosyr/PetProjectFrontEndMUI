import React from "react";
import { Typography, AppBar, CssBaseline, Grid, Toolbar, Container } from '@mui/material';

const App = () => {
    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6">
                        Summarizer
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div>
                    <Container maxWidth="sm">
                        <Typography variant="h2" align="center">
                            Main part                            
                        </Typography>
                    </Container>
                </div>
            </main>
        </>
    );
}

export default App;
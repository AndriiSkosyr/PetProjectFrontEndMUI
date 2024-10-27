import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        const clientId = localStorage.getItem('clientId');
        if (!clientId) {
            navigate('/Sign-in');  // Redirect to sign-in if clientId is not available
        }
    }, [navigate]);

    const handleDeleteAccount = async (clientId) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/client", {
                method: "DELETE",
                body: JSON.stringify({
                    clientId: clientId, // Pass the clientId from localStorage          
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            alert('Account deleted successfully!');
            
            // Clear localStorage and redirect to Sign-in
            localStorage.removeItem('clientId');
            navigate('/Sign-in');
        } catch (error) {
            alert(`Error deleting account: ${error.message}`);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 5,
                mb: 5,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Account Settings
            </Typography>

            <Button
                variant="contained"
                color="error"
                onClick={() => {
                    const clientId = localStorage.getItem('clientId');  // Retrieve clientId from localStorage
                    if (clientId) {
                        handleDeleteAccount(clientId);  // Pass the clientId to handleDeleteAccount
                    } else {
                        alert("Client ID not found. Please log in again.");
                        navigate('/Sign-in');
                    }
                }}
                sx={{ mt: 3 }}
            >
                Delete Account
            </Button>
        </Box>
    );
};

export default Account;

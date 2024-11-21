import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, ButtonGroup, Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from "react-router-dom";

const ListCard = ({ title, fetchUrl, deleteUrl, addLink, itemIdKey, itemNameKey, updateLinkBase }) => {
    const navigate = useNavigate();
    const [itemsArray, setItems] = useState([]);
    const [hoveredItemId, setHoveredItemId] = useState(null);

    // Generalized fetch function
    const fetchData = async (url, method = 'GET', body = null) => {
        try {
            const options = {
                method,
                headers: { "Content-Type": "application/json; charset=UTF-8" }
            };

            if (body) {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (err) {
            console.error(err.message);
            alert(`Error: ${err.message}`);
            return null;
        }
    };

    // Fetch items (calendars/events)
    const readItems = useCallback(async () => {
        const data = await fetchData(fetchUrl);
        if (data) setItems(data);
    }, [fetchUrl]);

    useEffect(() => {
        readItems();
    }, [readItems]);

    // Delete item (calendar/event)
    const deleteItem = async (itemId) => {
        const result = await fetchData(deleteUrl, 'DELETE', { [itemIdKey]: itemId });
        if (result) {
            setItems(prev => prev.filter(item => item[itemIdKey] !== itemId));
            alert("Item deleted successfully");
        }
    };

    return (
        <Box sx={{ height: '100%', padding: '2rem' }}>
            <Card
                variant="outlined"
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                }}
            >
                <Typography variant="subtitle1" sx={{ padding: '1rem' }}>
                    {title}
                </Typography>
                <List sx={{ flex: 1, overflowY: 'auto' }}>
                    {itemsArray.map(item => (
                        <ListItem key={item[itemIdKey]} id={item[itemIdKey]}>
                            <ListItemButton
                                onMouseEnter={() => setHoveredItemId(item[itemIdKey])}
                                onMouseLeave={() => setHoveredItemId(null)}
                            >
                                <ListItemText primary={item[itemNameKey]} />
                                <Box sx={{ display: hoveredItemId === item[itemIdKey] ? 'flex' : 'none' }}>
                                    <EditIcon
                                        fontSize="small"
                                        onClick={() => navigate(`${updateLinkBase}/${item[itemIdKey]}`)}
                                        sx={{ marginRight: '1vw' }}
                                    />
                                    <DeleteIcon fontSize="small" onClick={() => deleteItem(item[itemIdKey])} />
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Box
                    sx={{
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ButtonGroup
                        disableElevation
                        fullWidth
                        variant="outlined"
                        aria-label="outlined primary button group"
                    >
                        <Button component={Link} to={addLink} color="success">
                            Add {title.slice(0, -1)}
                        </Button>
                    </ButtonGroup>
                </Box>
            </Card>
        </Box>
    );
};

export default ListCard;

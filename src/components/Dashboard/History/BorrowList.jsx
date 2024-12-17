import React, { useState, useEffect } from "react";
import {
    Button, Box, Typography, Grid, Card, CardContent, CardMedia, ThemeProvider, createTheme
} from "@mui/material";
import axios from "axios";

const theme = createTheme({
    palette: {
        primary: { main: '#016565' },
        secondary: { main: '#f2ee9d' }
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                head: { backgroundColor: '#016565', color: '#FFFFFF' },
                body: { fontSize: 14 },
            },
        },
    },
});

export default function BorrowCart() {
    const [cartItems, setCartItems] = useState([]); // State to hold borrow_cart items
    const jwtToken = localStorage.getItem("jwtToken");

    // Fetch borrow_cart data
    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/borrowcart', {
                headers: { "Authorization": `Bearer ${jwtToken}` }
            });
            setCartItems(response.data); // Populate cartItems state
        } catch (error) {
            console.error('Error fetching borrow cart items:', error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [jwtToken]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>Borrow Cart</Typography>
                <Box sx={{ height: '70vh', overflow: 'auto' }}>
                    <Grid container spacing={3}>
                        {cartItems.map((item) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.cart_id}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.image_url || 'https://via.placeholder.com/140'}
                                        alt={item.item_name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.item_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Borrowed Quantity: {item.quantity}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Category: {item.category_name}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            sx={{ mt: 2, backgroundColor: '#e57373', color: '#FFF', '&:hover': { backgroundColor: '#c62828' } }}
                                        >
                                            Remove from Cart
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

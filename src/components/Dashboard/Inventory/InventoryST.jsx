import React, { useState, useEffect } from "react";
import Appbar from "../../Appbar/Appbar.jsx";
import Sidebar from "../../Sidebar/Sidebar.jsx";
import {
    Button, Box, Typography, Grid, Card, CardContent, CardMedia,
    ThemeProvider, createTheme, Snackbar, IconButton, Modal, TextField
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Inventory.css';

const theme = createTheme({
    palette: {
        primary: { main: '#016565' },
        secondary: { main: '#f2ee9d' }
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: '#016565',
                    color: '#FFFFFF',
                },
                body: {
                    fontSize: 14,
                },
            },
        },
    },
});

export default function InventoryST() {
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem("jwtToken");
    const [items, setItems] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        itemName: '',
        quantity: '',
        instructor: '',
        section: '',
        date: '',
        itemPhoto: 'https://via.placeholder.com/140', // Default demo image URL
    });
    const [currentUser, setCurrentUser] = useState('');

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleModalOpen = (item) => {
        setFormData({
            itemName: item.name,
            quantity: 1, // Default to 1
            maxQuantity: item.quantity,
            itemPhoto: item.image_url || 'https://via.placeholder.com/140', // Use a placeholder if item has no image
            category: item.category, // Add category field
        });
        setOpenModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'quantity') {
            const quantity = Math.min(value, formData.maxQuantity);
            setFormData({ ...formData, [name]: quantity });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };


    const handleFormSubmit = async () => {
        // Add the item to the Borrow Cart
        const borrowCart = JSON.parse(localStorage.getItem('borrowCart')) || [];
        borrowCart.push(formData);
        localStorage.setItem('borrowCart', JSON.stringify(borrowCart));

        // Display a message when the item is added to the Borrow Cart
        setSnackbarText(`${formData.itemName} added to Borrow Cart.`);
        setOpenSnackbar(true);
        setOpenModal(false);
    };

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/inventory/getAllInventory', {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            });
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching inventory items:', error);
        }
    };

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get('http://localhost:8080/user/current', {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            });
            setCurrentUser(response.data.name);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    useEffect(() => {
        fetchItems();
        fetchCurrentUser();
    }, [jwtToken]);

    return (
        <ThemeProvider theme={theme}>
            <Appbar page={"inventory"} />
            <div className="inventory-container">
                <Sidebar page={"inventory"} />
                <div className="inventory-content">
                    <Button
                        variant="contained"
                        sx={{ mb: 2, backgroundColor: '#016565', color: '#f2ee9d', '&:hover': { backgroundColor: '#014d4d' } }}
                        onClick={() => navigate('/inventory')}
                    >
                        Back to Categories
                    </Button>
                    <Box sx={{ height: '70vh', overflow: 'auto' }}>
                        <Grid container spacing={3}>
                            {items.map((item) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.inventory_id}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={item.image_url || 'https://via.placeholder.com/140'} // Fallback image
                                            alt={item.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.description}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Category: {item.category}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Quantity: {item.quantity}
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                sx={{ mt: 2, backgroundColor: '#f2ee9d', color: '#000', '&:hover': { backgroundColor: '#e0d96b' } }}
                                                onClick={() => handleModalOpen(item)}
                                            >
                                                Borrow
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </div>
            </div>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '10px',
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Borrow Item
                    </Typography>
                    <CardMedia
                        component="img"
                        height="140"
                        image={formData.itemPhoto}
                        alt={formData.itemName}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name="itemName"
                        value={formData.itemName}
                        label="Item Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                        name="category"
                        value={formData.category}
                        label="Category"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                        name="quantity"
                        value={formData.quantity}
                        label="Quantity"
                        type="number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleInputChange}
                        inputProps={{ min: 1, max: formData.maxQuantity }}
                    />
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button variant="outlined" onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#016565', color: '#FFF', '&:hover': { backgroundColor: '#014d4d' } }}
                            onClick={handleFormSubmit}
                        >
                            Add to Borrow Cart
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarText}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleSnackbarClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </ThemeProvider>
    );
}

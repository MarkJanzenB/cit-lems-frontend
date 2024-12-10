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
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];

        setFormData({
            itemName: item.name,
            quantity: '',
            instructor: currentUser,
            section: '',
            date: formattedDate,
            itemPhoto: item.image_url || 'https://via.placeholder.com/140', // Use a placeholder if item has no image
        });
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async () => {
        // Display a message when the "Borrow" button is clicked
        setSnackbarText(`Borrow request for ${formData.itemName} submitted successfully. Check your Borrow List for status.`);
        setOpenSnackbar(true);
        setOpenModal(false);
        // Simulate a network request or navigate to the borrow list if needed
        // navigate('/borrowlist'); // Uncomment this line to navigate after submission
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
                        onChange={handleInputChange}
                        label="Item Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        label="Quantity"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="instructor"
                        value={formData.instructor}
                        onChange={handleInputChange}
                        label="Instructor"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                        name="section"
                        value={formData.section}
                        onChange={handleInputChange}
                        label="Section"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        label="Date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        disabled
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
                            Borrow
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

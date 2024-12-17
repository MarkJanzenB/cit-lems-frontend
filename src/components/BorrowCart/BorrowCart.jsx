import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography, Grid, Modal, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Appbar from '../Appbar/Appbar.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import './BorrowCart.css';
import axios from 'axios';
import { getJWTSub } from '../Authentication/jwt.jsx';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function BorrowCart() {
    const [borrowCart, setBorrowCart] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [formData, setFormData] = useState({
        section: '',
        date: '',
        instructor: localStorage.getItem('currentUser') || ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchBorrowCart();
    }, []);

    const fetchBorrowCart = async () => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            console.error('JWT token is missing. Please log in.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/api/borrowcart/insti/${getJWTSub()}`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            setBorrowCart(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized! Please log in again.');
            } else {
                console.error('Error fetching borrow cart items:', error);
            }
        }
    };

    const handleFinalizeBorrow = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProceedToBorrow = async () => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            setSnackbarText("Authentication required. Please log in.");
            setOpenSnackbar(true);
            return;
        }

        const borrowItems = borrowCart.map(item => ({
            itemName: item.itemName,
            categoryName: item.categoryName,
            quantity: item.quantity,
            section: formData.section,
            date: formData.date,
            instructor: formData.instructor,
            status: 'Pending for Approval'
        }));

        try {
            const response = await axios.post(
                'http://localhost:8080/api/borrowitems',
                borrowItems,
                {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                // Clear the borrow cart
                localStorage.removeItem('borrowCart');
                setBorrowCart([]);
                setOpenModal(false);
                setOpenAlert(true);
            } else {
                console.error('Failed to post borrow items:', response.statusText);
            }
        } catch (error) {
            console.error('Error posting borrow items:', error);
        }
    };

    const handleAlertClose = () => {
        setOpenAlert(false);
    };

    const handleGoToBorrowList = () => {
        setOpenAlert(false);
        navigate('/borrowhistory/borrowlist');
    };

    return (
        <div className="borrowcart-container">
            <Appbar page={"borrowcart"} />
            <Sidebar page={"inventory"} />
            <div className="borrowcart-content">
                <Box sx={{ p: 4 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h4" gutterBottom>
                                Borrow Cart
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#016565', color: '#FFF', '&:hover': { backgroundColor: '#014d4d' } }}
                            onClick={handleFinalizeBorrow}
                        >
                            Finalize Borrow
                        </Button>
                    </Box>
                    <Grid container spacing={3} mt={4}>
                        {borrowCart.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image="https://via.placeholder.com/140"
                                        alt={item.itemName}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {item.itemName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Category: {item.categoryName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {item.quantity}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxHeight: '90%',
                        bgcolor: '#F2EE9D',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: '25px',
                        overflow: 'auto'
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2"
                                sx={{ fontWeight: 'bold', color: '#016565', textAlign: 'center' }}
                    >
                        Confirm Borrow Details
                    </Typography>
                    <Typography variant="body1">Teacher's name: Mr. Topacio</Typography>
                    <Typography variant="body1">Schedule: Nov 21, 2024 | 10:00 AM - 12:00 PM</Typography>
                    <Typography variant="body1">Items borrowed list:</Typography>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {borrowCart.map((item, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {item.itemName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Category: {item.categoryName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {item.quantity}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel id="section-label">Section</InputLabel>
                        <Select
                            labelId="section-label"
                            name="section"
                            value={formData.section}
                            label="Section"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="7 - Malunggay">7 - Malunggay</MenuItem>
                            <MenuItem value="8 - Sampaguita">8 - Sampaguita</MenuItem>
                            <MenuItem value="9 - Narra">9 - Narra</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name="date"
                        value={formData.date}
                        label="Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleInputChange}
                    />
                    {/*<TextField*/}
                    {/*    name="instructor"*/}
                    {/*    value={formData.instructor}*/}
                    {/*    label="Instructor"*/}
                    {/*    variant="outlined"*/}
                    {/*    fullWidth*/}
                    {/*    margin="normal"*/}
                    {/*    disabled*/}
                    {/*/>*/}
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button variant="outlined" onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#016565', color: '#FFF', '&:hover': { backgroundColor: '#014d4d' } }}
                            onClick={handleProceedToBorrow}
                        >
                            Proceed to Borrow
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={openAlert}
                onClose={handleAlertClose}
                aria-labelledby="alert-title"
                aria-describedby="alert-description"
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
                    <Typography id="alert-title" variant="h6" component="h2">
                        Borrow Request Processed
                    </Typography>
                    <Typography id="alert-description" sx={{ mt: 2 }}>
                        Your borrow request has been processed and is now pending for approval.
                    </Typography>
                    <Box display="flex" justifyContent="space-between" mt={4}>
                        <Button variant="outlined" onClick={handleAlertClose}>
                            Continue Borrowing
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#016565', color: '#FFF', '&:hover': { backgroundColor: '#014d4d' } }}
                            onClick={handleGoToBorrowList}
                        >
                            Go to Borrow List
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
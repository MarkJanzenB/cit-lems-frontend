import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography, Grid, Modal, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Appbar from '../Appbar/Appbar.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import './BorrowCart.css';

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
        const cart = JSON.parse(localStorage.getItem('borrowCart')) || [];
        setBorrowCart(cart);
    }, []);

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

    const handleProceedToBorrow = () => {
        const borrowList = JSON.parse(localStorage.getItem('borrowList')) || [];
        const updatedBorrowList = borrowCart.map(item => ({
            ...item,
            section: formData.section,
            date: formData.date,
            instructor: formData.instructor,
            status: 'Pending for Approval'
        }));
        localStorage.setItem('borrowList', JSON.stringify([...borrowList, ...updatedBorrowList]));

        // Clear the borrow cart
        localStorage.removeItem('borrowCart');
        setBorrowCart([]);
        setOpenModal(false);
        setOpenAlert(true);
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
                    <Typography variant="h4" gutterBottom>
                        Borrow Cart
                    </Typography>
                    <Grid container spacing={3}>
                        {borrowCart.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.itemPhoto}
                                        alt={item.itemName}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {item.itemName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Category: {item.category}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {item.quantity}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box display="flex" justifyContent="flex-end" mt={4}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#016565', color: '#FFF', '&:hover': { backgroundColor: '#014d4d' } }}
                            onClick={handleFinalizeBorrow}
                        >
                            Finalize Borrow
                        </Button>
                    </Box>
                </Box>
            </div>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '10px',
                }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Confirm Borrow Details
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {borrowCart.map((item, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.itemPhoto}
                                        alt={item.itemName}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {item.itemName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Category: {item.category}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Quantity: {item.quantity}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <TextField
                        name="section"
                        value={formData.section}
                        label="Section"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleInputChange}
                    />
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
                    <TextField
                        name="instructor"
                        value={formData.instructor}
                        label="Instructor"
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
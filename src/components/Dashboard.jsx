import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import StyledPaper from "./MyPaper";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Appbar from "./Appbar/Appbar.jsx";
// import './index.css';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Dashboard() {

    const navigate = useNavigate();

        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

    return (
        <>
            <Appbar/>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align={"center"}>
                        <Button>Edit Profile</Button><br/>
                        <Button>About</Button><br/>
                        <Button>Settings</Button><br/>
                        <Button>Log Out</Button><br/>
                    </Typography>
                </Box>
            </Modal>

            <StyledPaper width="800px" height="610px" sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, padding: 2}}>
                <Button variant="contained" sx={{backgroundColor: '#FFB3BA', color: 'black'}}>Schedule</Button>
                <Button variant="contained" sx={{backgroundColor: '#FFDFBA', color: 'black'}}>Inventory</Button>
                <Button variant="contained" sx={{backgroundColor: '#FFFFBA', color: 'black'}}>Reports</Button>
                <Button variant="contained" sx={{backgroundColor: '#BAFFC9', color: 'black'}}>Borrow History</Button>
            </StyledPaper>


        </>
    );
}
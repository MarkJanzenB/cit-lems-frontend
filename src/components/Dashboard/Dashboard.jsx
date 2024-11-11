import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import StyledPaper from "../MyPaper.jsx";
import Box from '@mui/material/Box';
import Appbar from "../Appbar/Appbar.jsx";

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

    const handleSched = () => {
        navigate('/schedule/request'); 
    };
    const handleInv = () => {
        navigate('/inventory');
    };
    const handleReps = () => {
        navigate('/report/damages');
    };
    const handleBHist = () => {
        navigate('/borrowhistory');
    };



    return (
        <>
            <Appbar page={'dashboard'}/>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    position: 'absolute',
                }}
            >
            <StyledPaper width="700px" height="510px"
                         sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, padding: 2,marginTop:'60px'}}>
                <Button variant="contained" sx={{backgroundColor: '#FFB3BA', color: 'black'}} onClick={handleSched}>Schedule</Button>
                <Button variant="contained" sx={{backgroundColor: '#FFDFBA', color: 'black'}} onClick={handleInv}>Inventory</Button>
                <Button variant="contained" sx={{backgroundColor: '#FFFFBA', color: 'black'}} onClick={handleReps}>Reports</Button>
                <Button variant="contained" sx={{backgroundColor: '#BAFFC9', color: 'black'}} onClick={handleBHist}>Borrow History</Button>
            </StyledPaper>
            </Box>


        </>
    );
}
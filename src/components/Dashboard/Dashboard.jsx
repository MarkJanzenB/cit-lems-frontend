import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import StyledPaper from "../MyPaper.jsx";
import Box from '@mui/material/Box';
import Appbar from "../Appbar/Appbar.jsx";
import { getJWTSub, isJWTExpired } from "../Authentication/jwt.jsx";
import axios from "axios";
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

    useEffect(() => {
        const jwtExpire = isJWTExpired(); // returns true if token is expired
        if (jwtExpire != null) {
            console.log(jwtExpire);
        }else{
            console.log("User is not logged in");
        }

        const jwtSub = getJWTSub();
        if (jwtSub != null){
            console.log(jwtSub);
        }else{
            console.log("Could not get JWT sub");
        }

        const isUserNew = async () => {
            try {
                const jwtToken = localStorage.getItem("jwtToken");

                if(!jwtToken){
                    console.log("JWT token not found");
                    return;
                }

                console.log("Request payload:", jwtSub); // Log the request payload
                const response = await axios.get(`http://localhost:8080/user/isusernew?instiId=${jwtSub}`, {
                    headers: {
                        "authorization": `Bearer ${jwtToken}`,
                    }});
                console.log("Is User New?", response.data); // Log the response data
                return response.data;
            } catch (error) {
                console.error("Error:", error.response ? error.response.data : error.message); // Log the error response
                throw error; // Re-throw the error to be handled by the caller
            }
        };

        isUserNew();
    }, []);

    const navigate = useNavigate();

    const handleSched = () => {
        navigate('/schedule/request'); 
    };
    const handleInv = () => {
        navigate('/inventory/categories');
    };
    const handleReps = () => {
        navigate('/report/damages');
    };
    const handleBHist = () => {
        navigate('/borrowhistory/list');
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
                <Button variant="contained" sx={{backgroundColor: '#FFB3BA', color: 'black', fontSize:'20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                        onClick={handleSched}><img src={"/sked.png"} style={{
                    width: '100px',
                    height: '100px'
                }}/>Schedule</Button>
                <Button variant="contained" sx={{
                    backgroundColor: '#FFDFBA',
                    color: 'black',
                    fontSize: '20px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                        onClick={handleInv}><img src={"/inventory.png"} style={{
                    width: '130px',
                    height: '100px'
                }}/>Inventory</Button>
                <Button variant="contained" sx={{backgroundColor: '#FFFFBA', color: 'black', fontSize: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                        onClick={handleReps}><img src={"/statistics.png"} style={{
                    width: '100px',
                    height: '100px'
                }}/>Reports</Button>
                <Button variant="contained" sx={{backgroundColor: '#BAFFC9', color: 'black', fontSize: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                        onClick={handleBHist}><img src={"/history.png"} style={{
                    width: '100px',
                    height: '100px'
                }}/>Borrow History</Button>
            </StyledPaper>
            </Box>
        </>
    );
}
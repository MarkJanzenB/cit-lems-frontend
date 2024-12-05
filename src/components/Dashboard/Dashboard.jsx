import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import StyledPaper from "../MyPaper.jsx";
import Box from '@mui/material/Box';
import Appbar from "../Appbar/Appbar.jsx";
import { getJWTSub, isJWTExpired } from "../Authentication/jwt.jsx";
import axios from "axios";
import GetStarted from '../GetStarted/GetStarted.jsx';

export default function Dashboard() {
    const [isNew, setIsNew] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    const roleid = localStorage.getItem("userRole");

    useEffect(() => {
        const checkAuthentication = async () => {
            const jwtToken = localStorage.getItem("jwtToken");
            if (!jwtToken || isJWTExpired()) {
                navigate("/login");
                return;
            }

            try {
                const jwtSub = getJWTSub();
                console.log("JWT Token:", jwtToken); // Log the JWT token
                console.log(roleid);

                const response = await axios.get(`http://localhost:8080/user/isusernew?instiId=${jwtSub}`, {
                    headers: { "Authorization": `Bearer ${jwtToken}` },
                });

                setIsNew(response.data);
            } catch (error) {
                console.error("Error in checkAuthentication:", error);
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("jwtToken");
                    navigate("/login");
                }
            }
        };

        checkAuthentication();
    }, [navigate]);

    const handleSched = () => navigate('/schedule/request');
    const handleInv = () => navigate('/inventory');
    const handleReps = () => navigate('/report/damages');
    const handleBHist = () => navigate('/borrowhistory/list');

    return (
        <>
            <Appbar page={'dashboard'} />

            {isNew && <GetStarted />}

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
                <StyledPaper
                    width="700px"
                    height="510px"
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 2,
                        padding: 2,
                        marginTop: '60px'
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#FFB3BA',
                            color: 'black',
                            fontSize: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        onClick={handleSched}
                    >
                        <img src="/sked.png" style={{ width: '100px', height: '100px' }} alt="Schedule Icon" />
                        Schedule
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#FFDFBA',
                            color: 'black',
                            fontSize: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        onClick={handleInv}
                    >
                        <img src="/inventory.png" style={{ width: '130px', height: '100px' }} alt="Inventory Icon" />
                        Inventory
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#FFFFBA',
                            color: 'black',
                            fontSize: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        onClick={handleReps}
                    >
                        <img src="/statistics.png" style={{ width: '100px', height: '100px' }} alt="Reports Icon" />
                        Reports
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#BAFFC9',
                            color: 'black',
                            fontSize: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        onClick={handleBHist}
                    >
                        <img src="/history.png" style={{ width: '100px', height: '100px' }} alt="History Icon" />
                        Borrow History
                    </Button>
                </StyledPaper>
            </Box>
        </>
    );
}
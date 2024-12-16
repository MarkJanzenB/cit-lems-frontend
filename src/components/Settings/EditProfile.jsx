import React, { useEffect, useState } from "react";
import MyPaper from "../MyPaper.jsx";
import profile from '/src/assets/static/img/profile2.gif';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const navigate = useNavigate();
    const [fetchedData, setFetchedData] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const jwtToken = localStorage.getItem("jwtToken");
    //         //please help meeeeeeeee
    //         const response = await fetch("https://your-api-endpoint.com/user", {
    //             method: "GET",
    //             headers: {
    //                 "Authorization": `Bearer ${jwtToken}`,
    //                 "Content-Type": "application/json"
    //             }
    //         });
    //         const data = await response.json();
    //         setFetchedData(data);
    //     };
    //
    //     fetchData();
    // }, []);

    const handleCancel = () => navigate(-1);

    const buttonStyle = {
        border: '1px solid #056765',
        borderRadius: '4px',
        padding: '8px 16px',
        margin: '8px 0',
        display: 'block',
        textAlign: 'center',
        textDecoration: 'none',
        backgroundColor: 'white',
        justifyContent: 'center',
        marginLeft: '38%',
        width: '25%',
        '&:hover': {
            backgroundColor: '#FFFFFF',
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ position: 'relative', width: '40%', height: '80%' }}>
                <img src="/../Public/L.png" style={{ width: '100%', height: '100%', borderRadius: '50px', position: 'absolute' }} alt="Profile Icon" />
                <MyPaper width="50%" height="50%" style={{ display: 'flex', justifyContent: 'center', backgroundColor: "#FFFFFF", borderRadius: '150px', position: 'absolute', top: '25%', left: '25%', zIndex: 1 }} elevation={0}>
                    <img src={profile} />
                </MyPaper>
            </div>
            <div style={{ width: '2px', height: '70%', borderLeft: '2px dashed #FFFFFF' }}></div>
            <MyPaper width="50%" height="80%" style={{ backgroundColor: "#FFFFBA", borderRadius: '50px', display: 'flex' }}>
                <div style={{ width: '100%', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '50px', textAlign: 'center', marginLeft: '180px' }}>Basic Information</h1>
                        <div style={{ position: 'absolute', top: 24, right: 8 }}>
                            <Button onClick={handleCancel}><img src={"/exit.gif"} style={{
                                width: '30px',
                                height: '30px',
                            }} /></Button>
                        </div>
                    </div>
                    <br />
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { fontSize: '20px' } }}
                        InputLabelProps={{ style: { fontSize: '20px' } }}
                        value={fetchedData ? fetchedData.firstName : ''}
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { fontSize: '20px' } }}
                        InputLabelProps={{ style: { fontSize: '20px' } }}
                        value={fetchedData ? fetchedData.lastName : ''}
                    />
                    <TextField
                        label="ID Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { fontSize: '20px' } }}
                        InputLabelProps={{ style: { fontSize: '20px' } }}
                        value={fetchedData ? fetchedData.idNumber : ''}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { fontSize: '20px' } }}
                        InputLabelProps={{ style: { fontSize: '20px' } }}
                        value={fetchedData ? fetchedData.email : ''}
                    />
                    <Box sx={buttonStyle}>
                        <Button>Save</Button>
                    </Box>
                </div>
            </MyPaper>
        </div>
    );
}
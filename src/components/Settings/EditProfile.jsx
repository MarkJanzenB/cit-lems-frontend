import React from "react";
import MyPaper from "../MyPaper.jsx";
import profile from '/src/assets/static/img/profile2.gif';
import TextField from "@mui/material/TextField";

export default function EditProfile() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ position: 'relative', width: '40%', height: '80%' }}>
                <img src="/../Public/L.png" style={{ width: '100%', height: '100%', borderRadius: '50px', position: 'absolute',  }} alt="Profile Icon" />
                <MyPaper width="50%" height="50%" style={{ display:'flex',justifyContent:'center', backgroundColor: "#FFFFFF", borderRadius: '150px', position: 'absolute', top: '25%', left: '25%', zIndex: 1 }} elevation={0}>
                    <img src={profile}/>
                </MyPaper>
            </div>
            <div style={{ width: '2px', height: '70%', borderLeft: '2px dashed #FFFFFF'}}></div>
            <MyPaper width="50%" height="80%" style={{ backgroundColor: "#FFFFBA", borderRadius: '50px', display: 'flex' }}>

                <div style={{width: '100%', padding: '20px'}}>
                    <h1 style={{fontSize: '50px', }}>Basic Information</h1>
                    <br/>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { fontSize: '50px' } }}
                        InputLabelProps={{ style: { fontSize: '50px' } }}
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { fontSize: '50px' } }}
                        InputLabelProps={{ style: { fontSize: '50px' } }}
                    />
                    <TextField
                        label="ID Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { fontSize: '50px' } }}
                        InputLabelProps={{ style: { fontSize: '50px' } }}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { fontSize: '50px' } }}
                        InputLabelProps={{ style: { fontSize: '50px' } }}
                    />

                </div>
            </MyPaper>
        </div>
    );
}
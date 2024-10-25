import React, { useState } from 'react';
import StyledPaper from "./MyPaper";
import logo from "../assets/static/img/Cebu_Institute_of_Technology_University_logo.jpg";
import lems from "../assets/static/img/lems-removebg-preview.png";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const register = async (credentials) => {
    try {
        const response = await axios.post("http://localhost:8080/user/register", credentials);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
};

export default function Register() {
    const [credentials, setCredentials] = useState({
        fname: '',
        lname: '',
        password: '',
        idnum: '',
        email: '',
        acctype: ''
    });
    const [showAccountTypeForm, setShowAccountTypeForm] = useState(false);
    const [paperSize, setPaperSize] = useState({ width: '600px', height: '610px' });
    const [popover, setPopover] = useState({ open: false, anchorEl: null, message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (!credentials.email.endsWith('@cit.edu')) {
            setPopover({ open: true, anchorEl: e.currentTarget, message: 'Email must end with @cit.edu' });
            return;
        }
        setShowAccountTypeForm(true);
        setPaperSize({ width: '600px', height: '300px' });
    };

    const handleAccountTypeNext = async (e) => {
        e.preventDefault();
        try {
            await register(credentials);
            setPopover({ open: true, anchorEl: e.currentTarget, message: 'User successfully created' });
        } catch (e) {
            setPopover({ open: true, anchorEl: e.currentTarget, message: 'Error submitting form' });
        }
    };

    const handlePopoverClose = () => {
        setPopover({ ...popover, open: false });
    };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/'); // Adjust the path as needed
    };

    const handleLoginRedirect = () => {
        navigate('/login'); // Adjust the path as needed
    };

    return (
        <>
            <Button onClick={handleBack} sx={{ marginTop: '20px' }}>Back</Button>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ backgroundColor: "white" }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <img className="inline-element logo1" src={logo} alt="Cebu Institute of Technology University Logo" style={{ marginRight: '20px' }} />
                        <img className="inline-element logo2" src={lems} alt="LEMS Logo" style={{ marginRight: 'auto' }} />
                        <Button onClick={handleLoginRedirect} sx={{ color: 'black', backgroundColor: '#ccffff', border: '2px solid teal' }}>Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <hr/>
            <br/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <StyledPaper width={paperSize.width} height={paperSize.height}>
                    {!showAccountTypeForm ? (
                        <form onSubmit={handleNext}>
                            <Box component="section" sx={{ p: 2, border: '1px solid grey' }}>
                                <h1>CREATE LEMS ACCOUNT</h1>
                            </Box>
                            <Box component="section" sx={{ p: 2, border: '1px solid grey' }}>
                                <div className="form-group">
                                    <TextField
                                        label="ID Number"
                                        type="text"
                                        name="idnum"
                                        value={credentials.idnum}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        margin="normal"
                                        autoComplete="username"
                                        sx={{ width: '80%' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextField
                                        label="First Name"
                                        type="text"
                                        name="fname"
                                        value={credentials.fname}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        margin="normal"
                                        autoComplete="given-name"
                                        sx={{ width: '80%' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextField
                                        label="Last Name"
                                        type="text"
                                        name="lname"
                                        value={credentials.lname}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        margin="normal"
                                        autoComplete="family-name"
                                        sx={{ width: '80%' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextField
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        margin="normal"
                                        autoComplete="email"
                                        sx={{ width: '80%' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextField
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        margin="normal"
                                        autoComplete="current-password"
                                        sx={{ width: '80%' }}
                                    />
                                </div>
                                <br/>
                                <button type="submit" className="center-button">NEXT</button>
                            </Box>
                        </form>
                    ) : (
                        <form onSubmit={handleAccountTypeNext}>
                            <Box component="section" sx={{ p: 2, border: '1px solid grey' }}>
                                <h1>SELECT ACCOUNT TYPE</h1>
                            </Box>
                            <Box component="section" sx={{ p: 2, border: '1px solid grey' }}>
                                <div className="form-group">
                                    <TextField
                                        label="Account Type"
                                        type="text"
                                        name="acctype"
                                        value={credentials.acctype}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        margin="normal"
                                        sx={{ width: '80%' }}
                                    />
                                </div>
                                <br/>
                                <button type="submit" className="center-button">SUBMIT</button>
                            </Box>
                        </form>
                    )}
                </StyledPaper>
            </div>
            <Popover
                open={popover.open}
                anchorEl={popover.anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography sx={{ p: 2 }}>{popover.message}</Typography>
            </Popover>
        </>
    );
}
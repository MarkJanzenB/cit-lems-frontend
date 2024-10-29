import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import AuthAppBar from '../Appbar/AuthAppbar';
import './Register.css'; 
import { Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

export default function Register() {
    const [credentials, setCredentials] = useState({
        fname: '',
        lname: '',
        idnum: '',
        email: '',
        acctype: ''
    });
    const [showAccountTypeForm, setShowAccountTypeForm] = useState(false);
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
    };

    const handlePopoverClose = () => {
        setPopover({ ...popover, open: false });
    };

    const navigate = useNavigate();

    return (
        <>
            <div className="register-container">
                <div className="register-background" />
                <Box className="register-paper">
                    {!showAccountTypeForm ? (
                        <form onSubmit={handleNext}>
                            <Box component="section" sx={{ p: 2}}>
                                <h1>CREATE LEMS ACCOUNT</h1>
                            </Box>
                            <Box component="section" sx={{ p: 2 }}>
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
                                    />
                                </div>
                                <Button type="submit" variant="contained"  style={{ backgroundColor: '#800000', color: 'white',  width:'300px'}} className="next-button">NEXT</Button>
                            </Box>
                        </form>
                    ) : (
                        <Box component="section" sx={{ p: 2 }}>
                        <h1>SELECT ACCOUNT TYPE</h1>
                        <FormControl fullWidth margin="normal" required>
                          <InputLabel>Account Type</InputLabel>
                          <Select
                            label="Account Type"
                            name="acctype"
                            value={credentials.acctype}
                            onChange={handleChange}
                          >
                            <MenuItem value="Laboratory Incharge">Laboratory Incharge</MenuItem>
                            <MenuItem value="Laboratory Assistant">Laboratory Assistant</MenuItem>
                            <MenuItem value="Science Teacher">Science Teacher</MenuItem>
                          </Select>
                        </FormControl>
                      
                        {/* Sign Up Button */}
                        <Button 
                          variant="contained" 
                          fullWidth 
                          sx={{ backgroundColor: '#800000', color: 'white', mt: 2, '&:hover': { backgroundColor: '#660000' } }}
                        >
                          Sign Up
                        </Button>
                        </Box>
                    )}
                </Box>
                <div className="image-side">
                    <h1 style={{ color: '#800000', fontSize:"2em"}}>Welcome Back to Your Laboratory Management Hub</h1>
                    <p className="custom-paragraph">
                        Revisit your streamlined laboratory experience with our application that efficiently tracks borrowing and breakages. Sign in now to continue managing your lab with ease!
                    </p><br/>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#800000', color: 'white' }}
                        onClick={() => navigate('/login')}
                        sx={{ width: '140px', height: '45px', fontSize:'1.5em', textTransform: 'none', lineHeight: '1.5' }}
                    >

                        Sign In
                    </Button>
                </div>
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

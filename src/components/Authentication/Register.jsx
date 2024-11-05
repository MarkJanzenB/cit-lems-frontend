import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
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
        first_name: '',
        last_name: '',
        insti_id: '',
        email: '',
        password: '',

    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const [showAccountTypeForm, setShowAccountTypeForm] = useState(false);


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
            setError('Email must end with @cit.edu');
            return;
        }
        setShowAccountTypeForm(true);
    };
    const handleAccountTypeNext = async (e) => {
        e.preventDefault();
        try {
            await register(credentials);
            console.log('Form submitted');
        } catch (e) {
            console.error("Error submitting form: ", e);
            setError('Error submitting form');
            setSuccess('');
        }
    };
    // const handlePopoverClose = () => {
    //     setPopover({ ...popover, open: false , anchorEl: null});
    // };

    const navigate = useNavigate();

    // const handleBack = () => {
    //     navigate('/'); // Adjust the path as needed
    // };

    const handleLoginRedirect = () => {
        navigate('/login'); // Adjust the path as needed
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!credentials.email.endsWith('@cit.edu')) {
    //         setError('Email must end with @cit.edu');
    //         return;
    //     }
    //     try {
    //         await register(credentials);
    //         console.log('Form submitted:', credentials);
    //         setError('');
    //         setSuccess('User successfully created');
    //     } catch (e) {
    //         console.error("Error submitting form: ", e);
    //         setError('Error submitting form');
    //         setSuccess('');
    //     }
    // };
    function testing(){
        console.log(credentials);
    }


    return (
        <>
            {/*<Button onClick={handleBack} sx={{ marginTop: '20px' }}>Back</Button>*/}

            <div className="register-container">

                <div className="register-background" />

                <Box className="register-paper">
                    {!showAccountTypeForm ? (
                        <form onSubmit={handleNext}>
                            <Box component="section" sx={{ p: 2}}>
                                <h1>CREATE LEMS ACCOUNT</h1>
                            </Box>
                            <Box component="section" sx={{p: 2}}>
                                <div className="form-group">
                                    <TextField
                                        label="ID Number"
                                        type="text"
                                        name="insti_id"
                                        value={credentials.insti_id}
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
                                        name="first_name"
                                        value={credentials.first_name}
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
                                        name="last_name"
                                        value={credentials.last_name}
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
                                    />
                                </div>
                                <Button type="submit" variant="contained"
                                        style={{backgroundColor: '#800000', color: 'white', width: '300px'}}
                                        className="next-button">NEXT</Button>
                            </Box>
                        </form>
                    ) : (
                        <form onSubmit={handleAccountTypeNext}>
                            <Box component="section" sx={{p: 2}}>
                                <h1>SELECT ACCOUNT TYPE</h1>
                                <FormControl fullWidth margin="normal" required>
                                    <InputLabel>Account Type</InputLabel>
                                    <Select
                                        label="Account Type"
                                        name="acctype"
                                        value={credentials.acctype}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Laboratory Incharge">Laboratory In-Charge</MenuItem>
                                        <MenuItem value="Laboratory Assistant">Laboratory Assistant</MenuItem>
                                        <MenuItem value="Science Teacher">Science Teacher</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Sign Up Button */}
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ backgroundColor: '#800000', color: 'white', mt: 2, '&:hover': { backgroundColor: '#660000' } }}
                                    type="submit"
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        </form>
                    )}
                    {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                    {success && <Typography color="success" sx={{ mt: 2 }}>{success}</Typography>}
                </Box>
                <div className="image-side">
                    <h1 style={{ color: '#800000', fontSize:"2em"}}>Welcome Back to Your Laboratory Management Hub</h1>
                    <p className="custom-paragraph">
                        Revisit your streamlined laboratory experience with our application that efficiently tracks borrowing and breakages. Sign in now to continue managing your lab with ease!
                    </p><br/>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#800000', color: 'white' }}
                        onClick={handleLoginRedirect}
                        sx={{ width: '130px', height: '35px', fontSize:'1em', lineHeight: '1.5' }}
                    >
                        SIGN IN
                    </Button>
                </div>
            </div>

        </>
    );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
}));

export default function Login() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        id_number: '',
        password: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedFormValues = {
            ...formValues,
            [name]: value
        };
        setFormValues(updatedFormValues);
        validateForm(updatedFormValues);
    };

    const validateForm = (values) => {
        const isValid = values.username.trim() !== '' && values.password.trim() !== '';
        setIsFormValid(isValid);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add authentication logic here
        console.log('Login successful');
        navigate('/dashboard'); // Redirect to dashboard or another page
    };

    return (
        <FormGrid container spacing={3}>
            <Grid item xs={12}>
                <h1>Login</h1>
            </Grid>
            <Grid item xs={12}>
                <FormLabel htmlFor="id_number" required>
                    ID Number
                </FormLabel>
                <OutlinedInput
                    id="id_number"
                    name="ID Number"
                    type="text"
                    placeholder="Enter your ID Number"
                    required
                    size="small"
                    value={formValues.id_number}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={12}>
                <FormLabel htmlFor="password" required>
                    Password
                </FormLabel>
                <OutlinedInput
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    size="small"
                    value={formValues.password}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    Login
                </Button>
            </Grid>
        </FormGrid>
    );
}
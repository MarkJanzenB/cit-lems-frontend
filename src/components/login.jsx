import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight:  '1000px',

  padding: '100px', // Adjust padding as needed
}));

export default function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormValues = {
      ...formValues,
      [name]: value,
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
    navigate('/dashboard'); // Redirect to dashboard
  };

  return (
    <FormGrid container spacing={3}>
      <Grid item xs={12}>
        <h1>Login</h1>
      </Grid>
      <Grid item xs={12}>
        <FormLabel htmlFor="username" required>
          Username
        </FormLabel>
        <OutlinedInput
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          required
          size="small"
          value={formValues.username}
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={handleSubmit} disabled={!isFormValid}>
            Login
          </Button>
          <Button variant="contained" onClick={() => navigate('/register')}>
            Register
          </Button>
        </Box>
      </Grid>
    </FormGrid>
  );
}
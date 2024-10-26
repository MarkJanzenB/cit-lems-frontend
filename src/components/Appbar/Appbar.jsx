import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Appbar.css';

const Appbar = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <AppBar position="static" className="appbar">
      <Toolbar className="appbar-toolbar">
        <img src={'../src/assets/nobg.png'} alt="Logo" className="appbar-logo" />
        <div style={{ flexGrow: 1 }} />
        <Typography variant="h6" className="appbar-typography">
         
        </Typography>
        <Button className="appbar-button" onClick={handleSignIn}>
          SIGN IN
        </Button>
        <Button className="appbar-button appbar-button-signup" onClick={handleSignUp}>
          SIGN UP
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;

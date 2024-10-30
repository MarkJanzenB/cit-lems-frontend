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
    <AppBar  className="appbar">
      <Toolbar className="appbar-toolbar">
        <img src={'../src/assets/static/img/nobg.png'} alt="Logo" className="appbar-logo"/>
        <div style={{flexGrow: 1}}/>
        <Typography variant="h6" className="appbar-typography">

        </Typography>

        <Button variant={'outlined'}
                sx={{fontSize: '1.5em',
                  '&:hover': {
                    backgroundColor: '#FFF1DB', // Change the background color on hover
                    color: '#056765', // Change the text color on hover
                  },}} onClick={handleSignIn}>

          Sign In
        </Button>
        <div className="vertical-line"></div>
        <Button variant={'outlined'} sx={{fontSize: '1.5em',
          '&:hover': {
            backgroundColor: '#FFF1DB', // Change the background color on hover
            color: '#056765', // Change the text color on hover
          },}} onClick={handleSignUp}>
          Sign Up
        </Button>


      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import './AuthAppbar.css';

const AuthAppbar = () => {
  return (
    <AppBar position="static" className="appbar">
      <Toolbar className="appbar-toolbar">
        <img src={'../src/assets/nobg.png'} alt="Logo" className="appbar-logo" />
        <div style={{ flexGrow: 1 }} />
        <Typography variant="h6" className="appbar-typography">
          {/* You can add a title here if needed */}
        </Typography>
        {/* Removed SIGN IN and SIGN UP buttons */}
      </Toolbar>
    </AppBar>
  );
};

export default AuthAppbar;

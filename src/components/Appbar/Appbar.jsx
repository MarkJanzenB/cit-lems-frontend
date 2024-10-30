import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Appbar.css';

const Appbar = ({ page }) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleSignOut = () => {
    // Add sign out logic here
    navigate('/login');
  };

  return (
      <AppBar className="appbar">
        <Toolbar className="appbar-toolbar">
          <img src={'../src/assets/static/img/nobg.png'} alt="Logo" className="appbar-logo" />
          <div style={{ flexGrow: 1 }} />
          <Typography variant="h6" className="appbar-typography"></Typography>
          {page === 'home' ? (
              <>
                <Button
                    variant={'outlined'}
                    sx={{
                      fontSize: '1.5em',
                      '&:hover': {
                        backgroundColor: '#FFF1DB',
                        color: '#056765',
                      },
                    }}
                    onClick={handleSignIn}
                >
                  Sign In
                </Button>
                <div className="vertical-line"></div>
                <Button
                    variant={'outlined'}
                    sx={{
                      fontSize: '1.5em',
                      '&:hover': {
                        backgroundColor: '#FFF1DB',
                        color: '#056765',
                      },
                    }}
                    onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </>
          ) : (
              <>
                <Button
                    variant={'outlined'}
                    sx={{
                      fontSize: '1.5em',
                      '&:hover': {
                        backgroundColor: '#FFF1DB',
                        color: '#056765',
                      },
                    }}
                    onClick={handleSignOut}
                >
                  Sign Out
                </Button>
                <div className="vertical-line"></div>
                <Button
                    variant={'outlined'}
                    sx={{
                      fontSize: '1.5em',
                      '&:hover': {
                        backgroundColor: '#FFF1DB',
                        color: '#056765',
                      },
                    }}
                    onClick={() => navigate('/profile')}
                >
                  <img src={'../src/assets/static/img/profile.png'} alt="Profile" className="profile-icon" />
                </Button>
              </>
          )}
        </Toolbar>
      </AppBar>
  );
};

export default Appbar;
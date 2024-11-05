import React, {useState} from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import './Appbar.css';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import profile from '/profile.gif';


const Appbar = ({ page }) => {
  const navigate = useNavigate();


  //
  // const handleSignOut = () => {
  //   // Add sign out logic here
  //   navigate('/login');
  // };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
      <AppBar className="appbar">
        <Toolbar className="appbar-toolbar">
          <img src={'../src/assets/static/img/nobg.png'} alt="Logo" className="appbar-logo" />
          <div style={{ flexGrow: 1 }} />
          <Typography variant="h6" className="appbar-typography"></Typography>
          {page === 'home' ? (
              <>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button
                    variant={'outlined'}
                    sx={{
                      fontSize: '1.5em',
                      '&:hover': {
                        backgroundColor: '#FFF1DB',
                        color: '#056765',
                      },
                    }}
                    // onClick={handleSignIn}
                >
                  Sign In
                </Button>
              </Link>
                <div className="vertical-line"></div>


                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button
                    variant={'outlined'}
                    sx={{
                      fontSize: '1.5em',
                      '&:hover': {
                        backgroundColor: '#FFF1DB',
                        color: '#056765',
                      },
                    }}
                    // onClick={handleSignUp}
                  >
                  Sign Up
                  </Button>
                </Link>
              </>
          ) : (
              <>
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
                    onClick={handleOpen}
                >

                  <img src={profile} alt="Profile" style={{ width: '50px', height: '50px' }} />
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align={"center"}>
                      <Button>Edit Profile</Button><br/>
                      <Button>About</Button><br/>
                      <Button>Settings</Button><br/>
                      <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button>Log Out</Button></Link><br/>
                    </Typography>
                  </Box>
                </Modal>
              </>
          )}
        </Toolbar>
      </AppBar>
  );
};

export default Appbar;
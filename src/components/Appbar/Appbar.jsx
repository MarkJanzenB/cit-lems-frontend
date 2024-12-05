import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import './Appbar.css';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import profile from '/src/assets/static/img/profile2.gif';
import m1 from '/src/assets/static/img/menu.png';
import logo from '/src/assets/static/img/LEMS1.png'; // Correct path to the logo image

const Appbar = ({ page }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    setIsAuthenticated(!!jwtToken);
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
     bgcolor: '#FFF1DB',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
  };

  const buttonStyle = {
    border: '1px solid #056765',
    borderRadius: '4px',
    padding: '8px 16px',
    margin: '8px 0',
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#FFF1DB',
    }
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: '#056765',
    border: '1px solid #056765',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FFF1DB',
    }
  };

  return (
    <AppBar className="appbar">
      <Toolbar className="appbar-toolbar">
        {isAuthenticated ? (
            <img src={logo} alt="Logo" className="appbar-logo" />
        ) : (
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src={logo} alt="Logo" className="appbar-logo" />
            </Link>
        )}
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
                  color: '#BAFFC9',
                },
              }}
              onClick={handleOpen}
            >
              <img src={m1} alt="menu" style={{ width: '50px', height: '50px' }} />
            </Button>
            <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Button style={closeButtonStyle} onClick={handleClose} sx={{...closeButtonStyle,
                      '&:hover': {
                        backgroundColor: '#056765',
                      }
                }} >X</Button><br />

                <Typography id="modal-modal-title" variant="h6" component="h2" align={"center"}>
                  <Link to="/register" style={{ textDecoration: 'none' }}>
                    <Box sx={{
                      ...buttonStyle,
                      '&:hover': {
                        bgcolor: '#056765',
                        '& button': {
                          color: '#FFF'
                        }
                      }
                    }}>
                      <Button sx={{
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        color: '#056765',
                      }}>Create An Account</Button><br />
                    </Box>
                  </Link>
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Box sx={{
                      ...buttonStyle,
                      '&:hover': {
                        bgcolor: '#056765',
                        '& button': {
                          color: '#FFF'
                        }
                      }
                    }}>
                      <Button sx={{
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        color: '#056765',
                      }}>Sign In</Button><br />
                    </Box>
                  </Link>
                </Typography>
              </Box>
            </Modal>
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
                  color: 'white',
                },
              }}
              onClick={handleOpen}
            >
              <img src={profile} alt="Profile" style={{ width: '50px', height: '50px' }} />
            </Button>
            <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Button style={closeButtonStyle} onClick={handleClose}>X</Button><br />
                <Typography id="modal-modal-title" variant="h6" component="h2" align={"center"}>
                  <Box sx={buttonStyle}>
                    <Link to="/editprofile">
                    <Button sx={{
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      // color: 'green',
                      '&:hover': { color: 'green' }
                    }}>Edit Profile</Button></Link><br />

                  </Box>
                  <Box sx={buttonStyle}>
                    <Button sx={{
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      // color: '#056765',
                      '&:hover': { color: 'green' }
                    }}>Settings</Button><br />
                  </Box>
                  <Box sx={buttonStyle}>
                    <Button sx={{
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      // color: '#056765',
                      '&:hover': { color: 'green' }
                    }}>Help</Button><br />
                  </Box>
                  <Box sx={buttonStyle}>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      <Button sx={{
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        // color: '#056765',
                        '&:hover': { color: 'green' }
                    }}>Log Out</Button></Link><br />
                  </Box>
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
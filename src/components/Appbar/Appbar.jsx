import React, {useState} from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import './Appbar.css';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import profile from '/src/assets/static/img/profile2.gif';
import m1 from '/src/assets/static/img/menu.png';

const Appbar = ({ page }) => {
  const navigate = useNavigate();



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

  const buttonStyle = {
    border: '1px solid #056765',
    borderRadius: '4px',
    padding: '8px 16px',
    margin: '8px 0',
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none',
    backgroundColor: '#FFF1DB',
  };

  const buttonStyle1 = {
    border: '1px solid #056765',
    borderRadius: '4px',
    padding: '8px 16px',
    margin: '8px 0',
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none',
    backgroundColor: '#FFB3BA',
  };

  return (
      <AppBar className="appbar">
        <Toolbar className="appbar-toolbar">
          {page === 'dashboard' ? (
              <Link to="/" style={{ textDecoration: 'none' }}>
                <img src={'../src/assets/static/img/LEMS1.png'} alt="Logo" className="appbar-logo" />
              </Link>
          ) : (
              <img src={'../src/assets/static/img/LEMS1.png'} alt="Logo" className="appbar-logo" />
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
                        color: '#056765',
                      },
                    }}
                    onClick={handleOpen}
                >
                  <img src={m1} alt="menu" style={{ width: '50px', height: '50px' }} />
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align={"center"}>
                      <Box sx={buttonStyle}>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                          <Button sx={{ fontFamily: 'monospace', fontWeight: 'bold',color: '#056765', '&:hover': { color: 'green' } }}>Create An Account</Button></Link><br/>
                      </Box>
                      <Box sx={buttonStyle}>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                          <Button sx={{ fontFamily: 'monospace', fontWeight: 'bold',color: '#056765', '&:hover': { color: 'green' } }}>Sign In</Button></Link><br/>
                      </Box>
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
                        color: '#056765',
                      },
                    }}
                    onClick={handleOpen}
                >
                  {/*{page === 'home'?(<img src={menu} alt="Menu" style={{ width: '50px', height: '50px' }} />): (*/}
                     <img src={profile} alt="Profile" style={{width: '50px', height: '50px'}}/>

                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align={"center"}>
                      <Box sx={buttonStyle}>
                        <Button sx={{ fontFamily: 'monospace', fontWeight: 'bold',color: '#056765', '&:hover': { color: 'green' } }}>Edit Profile</Button><br/>
                      </Box>
                      <Box sx={buttonStyle}>
                        <Button sx={{ fontFamily: 'monospace', fontWeight: 'bold',color: '#056765', '&:hover': { color: 'green' } }}>Settings</Button><br/>
                      </Box>
                      <Box sx={buttonStyle}>
                        <Button sx={{ fontFamily: 'monospace', fontWeight: 'bold',color: '#056765', '&:hover': { color: 'green' } }}>Help</Button><br/>
                      </Box>
                      <Box sx={buttonStyle}>
                          <Link to="/login" style={{ textDecoration: 'none' }}>
                          <Button sx={{ fontFamily: 'monospace', fontWeight: 'bold',color: '#056765', '&:hover': { color: 'green' } }}>Log Out</Button></Link><br/>
                      </Box>
                    </Typography>
                  </Box>
                </Modal>
              </>
          )}
        </Toolbar>
      </AppBar>
  );S
};

export default Appbar;
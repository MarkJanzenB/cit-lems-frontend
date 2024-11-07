import React, {useState} from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import './Appbar.css';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import profile from '/src/assets/static/img/profile2.gif';
import menu from '/src/assets/static/img/menu.png';

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
    // hover: {
    //     backgroundColor: '#056765',
    //     color: '#FFF1DB',
    // }
  };


  return (
      <AppBar className="appbar">
        <Toolbar className="appbar-toolbar">
          <Link to="/" style={{ textDecoration: 'none' }}>
          <img src={'../src/assets/static/img/LEMS1.png'} alt="Logo" className="appbar-logo" />
          </Link>
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

                  <img src={page === 'home' ? menu : profile} alt="Icon" style={{width: '50px', height: '50px'}}/>
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
                      <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button>Log Out</Button></Link><br/>
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
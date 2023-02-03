import React from "react";
import { Box, Button, Typography, Modal } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../resources/logo.png';
import Sun from '../resources/sun.png';
import './Navbar.css';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const location = useLocation();
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
  const [darkMode, setDarkMode] = React.useState(false);
  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Box sx={{ backgroundColor: '#1f2937', }}>
      <Grid
        sx={{ p: 1 }}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          container
          justifyContent="center"
          sx={{ pl: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img src={Logo} alt="Logo" style={{ maxWidth: 180 }} />
        </Grid>
        <Grid
          container
          sx={{ pl: 1, cursor: 'pointer' }}
          onClick={() => setDarkMode(!darkMode)}
        >
          <img src={Sun} alt="Sun" style={{ maxWidth: 30 }} />
        </Grid>
        <Grid container>
          <Grid sx={{ pl: 1 }}>
            <Button variant="contained" onClick={handleOpen}>Help</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  How to use this bot
                </Typography>
                {/* I know this is scuffed, ill figure it out later - FROM ALEX */}
                <p id="modal-modal-description" sx={{ mt: 2 }}>
                <br></br>
                  1. Select your name from the dropdown menu <br></br><br></br>
                  2. Select up to 12 weekend shifts that you prefer to work<br></br><br></br>
                  3. Rank your preferences from highest priority to lowest<br></br><br></br>
                  4. Submit your preferences and wait for allocations to be announced
                </p>
              </Box>
            </Modal>
          </Grid>
          <Grid sx={{ pl: 1 }}>
            { location.pathname === '/admin'
              ? <Button variant="contained" onClick={() => navigate('/')}> Home </Button>
              : <Button variant="contained" onClick={() => navigate('/admin')}> Admin </Button>
            }
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
};

export default Navbar;

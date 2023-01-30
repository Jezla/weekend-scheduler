import React from "react";
import { Box, Button, Typography, Modal } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../resources/logo.png';

const Navbar = (props) => {
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
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Simple instructions to be added
                </Typography>
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

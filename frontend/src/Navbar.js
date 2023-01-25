import React from "react";
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Logo from './logo.png';

const Navbar = (props) => {
    const handleSubmit = () => {
        console.log("This is a button")
        // TODO: check for existing name
        // TODO: probs add a confirmation popup
    }

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
              sx={{ pl: 1 }}
            >

              <img src={Logo} alt="Logo" style={{ maxWidth: 180 }} />
            </Grid>
            <Grid container>
              <Grid sx={{ pl: 1 }}>
                <Button variant="contained" onClick={handleSubmit}> Help </Button>
              </Grid>
              <Grid sx={{ pl: 1 }}>
                <Button variant="contained" onClick={handleSubmit}> Admin </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
    )
};

export default Navbar;

import React from "react";
import Box from '@mui/material/Box';
import { Button, Stack, Typography, Switch, FormControl } from '@mui/material';
import { useState } from 'react';
import Logo from './logo.png';

const Navbar = (props) => {
    const [view, toggleView] = useState(false) // Toggle between list and calendar view

    const handleSubmit = () => {
        console.log("This is a button")
        // TODO: check for existing name
        // TODO: probs add a confirmation popup
    }

    return (
        <Box sx={{ height: 60, backgroundColor: '#1f2937', }}>
            <img src={Logo} alt="Logo" style={{ height: 40, paddingTop: 20, paddingLeft: 20 }} />
            <div style={{right:'0', alignItems:'flex-end', display: 'flex', justifyContent: 'space-between', maxWidth: '400px', margin: 'auto'}}>
                <FormControl>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>List</Typography>
                        <Switch size="medium" checked={view} onChange={(e) => toggleView(e.target.checked)} />
                        <Typography>Calendar</Typography>
                    </Stack>
                </FormControl>
                <Button variant="contained" onClick={handleSubmit}> Help </Button>
                <Button variant="contained" onClick={handleSubmit}> Admin </Button>
            </div>
        </Box>
    )
};

export default Navbar;

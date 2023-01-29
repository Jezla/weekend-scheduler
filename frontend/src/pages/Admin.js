import React from 'react';
import { useState, useEffect } from 'react';
import {
  Button, FormControl, InputLabel, Select, MenuItem, Typography, Modal, Box
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

function App() {
  React.useEffect(() => {
    // Get backend input for all valid weekends and public holidays
    // Fill listDates array
    // Get all employee names and fill nameList
  }, [])

  const [name, setName] = useState("");
  const [nameList, setNameList] = useState(['Austin Lai', 'Alex Law', 'Adrian Lin']);
  const [open, setOpen] = React.useState(false);
  const [removeOpen, setRemoveOpen] = React.useState(false);
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
  const handleSubmit = () => {
    // TODO: Pass all preferences to backend to generate CSV
  }

  return (
    <>
      <Grid container direction="column" justifyContent="center" alignItems="center" textAlign="center">
        <Grid>
          <h5>Upload Items</h5>
          <Button variant="contained" component="label">
            Upload Available Shifts
            <input type="file" hidden />
          </Button>
          <Button variant="contained" component="label">
            Upload SRE List
            <input type="file" hidden />
          </Button>
        </Grid>
        {/* <Grid>
          <h5>Manage SREs</h5>
          <Button variant="contained" onClick={() => setRemoveOpen(true)}>Remove SRE</Button>
          <Modal
            open={removeOpen}
            onClose={() => setRemoveOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Remove SRE
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <FormControl sx={{ m: 1, minWidth: 360 }} size="small">
                  <InputLabel>Select Name</InputLabel>
                  <Select
                    value={name}
                    label="Select Name"
                    onChange={(e) => setName(e.target.value)}
                  >
                    {nameList.map((name, index) => <MenuItem key={index} value={name}>{name}</MenuItem>)}
                  </Select>
                </FormControl>
                <Button variant="contained" onClick={handleSubmit}>
                  Remove SRE
                </Button>
              </Typography>
            </Box>
          </Modal>
          <Button variant="contained" onClick={handleOpen}>Add SRE</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add SRE
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label>SRE Name</label>
                <input type="text" id="newSREName" />
                <label>SRE ID</label>
                <input type="text" id="newSREID" />
                <Button variant="contained" onClick={handleSubmit}>
                  Add SRE
                </Button>
              </Typography>
            </Box>
          </Modal>
        </Grid> */}
        <Grid>
          <h5>Generate CSV</h5>
          <Button variant="contained" onClick={handleSubmit}>
            Generate CSV
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default App;

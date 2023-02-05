import React, { useState } from 'react';
import {
  Button, Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

// TODO: Probs add some confirmation for uploading available shifts and sre list

function App() {
  React.useEffect(() => {
    // Get backend input for all valid weekends and public holidays
    // Fill listDates array
    // Get all employee names and fill nameList
  }, [])

  const [shiftFile, setShiftFile] = React.useState("");
  const [sreFile, setSreFile] = React.useState("");

  const uploadShifts = async (file) => {
    // TODO: Change api link
    const formData = new FormData();
    formData.append('file', file);

    const resp = await fetch('http://localhost:5000/addshift', {
      method: 'POST',
      body: formData
    });
    const data = await resp.json()
    console.log(data)
  }

  const uploadSREs = async (file) => {
    // TODO: Change api link
    const formData = new FormData();
    formData.append('file', file);

    const resp = await fetch('http://localhost:5000/srelist', {
      method: 'POST',
      body: formData
    });
    const data = await resp.json()
    console.log(data)
  }

  const handleSubmit = async () => {
    // TODO: Pass all preferences to backend to generate CSV
    const resp = await fetch('http://localhost:5000/final', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
    });
    const data = await resp.json() // NOTE: data should be our file
    console.log(data)
  }

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        spacing={2}
        sx={{ pt: 2 }}
      >
        <Grid container direction="column" spacing={2}>
          <Grid>
            <h5>Upload Items</h5>
            <Button variant="contained" component="label">
              Upload Available Shifts
              <input type="file" hidden accept=".csv" onChange={(e) => {
                setShiftFile(e.target.files[0]);
                uploadShifts(e.target.files[0]);
              }}/>
            </Button>
            <Typography>{shiftFile.name}</Typography>
          </Grid>
          <Grid>
            <Button variant="contained" component="label">
              Upload SRE List
              <input type="file" hidden accept=".csv" onChange={(e) => {
                setSreFile(e.target.files[0])
                uploadSREs(e.target.files[0])
              }}/>
            </Button>
            <Typography>{sreFile.name}</Typography>
          </Grid>
        </Grid>
        <Grid spacing={2}>
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

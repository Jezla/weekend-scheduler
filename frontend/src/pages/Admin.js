import React from 'react';
import {
  Button, Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

function Admin() {

  const [shiftFile, setShiftFile] = React.useState("");
  const [sreFile, setSreFile] = React.useState("");

  const uploadShifts = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const resp = await fetch('http://10.134.82.115:5000/addshift', {
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

    const resp = await fetch('http://10.134.82.115:5000/srelist', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: formData
    });
    const data = await resp.json()
    console.log(data)
  }

  const handleSubmit = async () => {
    // TODO: Pass all preferences to backend to generate CSV
    await fetch('http://10.134.82.115:5000/final', {
      method: 'GET',
      headers: {
        'Content-type': 'text/csv',
      },
    }).then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(
          blob
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          'shifts.csv'
        );

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      });
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
              <input type="file" hidden accept=".xlsx, .xls, .csv" onChange={(e) => {
                setShiftFile(e.target.files[0]);
                uploadShifts(e.target.files[0]);
              }}/>
            </Button>
            <Typography>{shiftFile.name}</Typography>
          </Grid>
          <Grid>
            <Button variant="contained" component="label">
              Upload SRE List
              <input type="file" hidden accept=".xlsx, .xls, .csv" onChange={(e) => {
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

export default Admin;

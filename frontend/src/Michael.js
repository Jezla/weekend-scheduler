import './App.css';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';


function Michael() {
  return (
    <div className="App" style={{ width: '350px', marginLeft: 'auto', marginRight: 'auto', marginTop: '100px', backgroundColor: 'yellow' }}>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <TextField id="outlined-basic" label="First Name" variant="outlined" />

      <header>Day</header>
      {/* <Slider
        style={{
          width: '10px',
          marginLeft: '1000px',
          color: '#12FEBC'
        }}
        aria-label="Temperature"
        defaultValue={1}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={30}
      /> */}
      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="1" />
        <FormControlLabel control={<Switch defaultChecked />} label="10" />
        <FormControlLabel control={<Switch defaultChecked />} label="11" />
        <FormControlLabel control={<Switch defaultChecked />} label="12" />
        <FormControlLabel control={<Switch defaultChecked />} label="13" />
        <FormControlLabel control={<Switch defaultChecked />} label="14" />
        <FormControlLabel control={<Switch defaultChecked />} label="15" />
        <FormControlLabel control={<Switch defaultChecked />} label="16" />
        <FormControlLabel control={<Switch defaultChecked />} label="17" />
        <FormControlLabel control={<Switch defaultChecked />} label="18" />
        <FormControlLabel control={<Switch defaultChecked />} label="19" />
        <FormControlLabel control={<Switch defaultChecked />} label="2" />
        <FormControlLabel control={<Switch defaultChecked />} label="20" />
        <FormControlLabel control={<Switch defaultChecked />} label="21" />
        <FormControlLabel control={<Switch defaultChecked />} label="22" />
        <FormControlLabel control={<Switch defaultChecked />} label="23" />
        <FormControlLabel control={<Switch defaultChecked />} label="24" />
        <FormControlLabel control={<Switch defaultChecked />} label="25" />
        <FormControlLabel control={<Switch defaultChecked />} label="26" />
        <FormControlLabel control={<Switch defaultChecked />} label="27" />
        <FormControlLabel control={<Switch defaultChecked />} label="28" />
        <FormControlLabel control={<Switch defaultChecked />} label="29" />
        <FormControlLabel control={<Switch defaultChecked />} label="30" />
        <FormControlLabel control={<Switch defaultChecked />} label="3" />
        <FormControlLabel control={<Switch defaultChecked />} label="4" />
        <FormControlLabel control={<Switch defaultChecked />} label="5" />
        <FormControlLabel control={<Switch defaultChecked />} label="6" />
        <FormControlLabel control={<Switch defaultChecked />} label="7" />
        <FormControlLabel control={<Switch defaultChecked />} label="8" />
        <FormControlLabel control={<Switch defaultChecked />} label="9" />
      </FormGroup>
      <header>Month</header>
      <Slider
        style={{
          width: '5px',
          marginLeft: '-1300px',
          color: '#39FF14'
        }}
        aria-label="Temperature"
        defaultValue={1}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={12}
      />
      <header>Year</header>
      <Slider
        style={{
          width: '1500px',
          marginLeft: '-525px',
          color: '#BC13FE'
        }}
        aria-label="Temperature"
        defaultValue={2023}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={2023}
        max={2024}
      />
      <TextField id="outlined-basic" label="Last Name" variant="outlined" />
      <Button variant="contained">Submit</Button>
    </div>
  );
}

export default Michael;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import NavBar from './Navbar';

function App() {
  useEffect(() => {
    // Get backend input for all valid weekends and public holidays
    // Fill listDates array
    // Get all employee names and fill nameList
  }, [])

  return (
    <>
      <NavBar></NavBar>
    </>
  );
}

export default App;

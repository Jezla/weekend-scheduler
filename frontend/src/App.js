import './App.css';
import NavBar from './components/Navbar';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Admin from './pages/Admin'

function App() {

return (
  <>
    <BrowserRouter>
      <NavBar/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
  </>
);
}

export default App;

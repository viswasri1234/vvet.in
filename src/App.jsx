import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';

import Contact from './Components/Contact';
import Footer from './Components/Footer';
import FormBuilder from './Components/FormBuilder';
import AboutUs from './Components/AboutUs';
import './App.css';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Supporter from './Components/Supporter';
import FundDrive from './Components/FundDrive';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/form" element={<FormBuilder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/supporter" element={<Supporter />} />
        <Route path="/FundDrive" element={<FundDrive />} />
      </Routes>
    </Router> 
  );
}

export default App;

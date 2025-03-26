import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Pay from './Components/Register';
import Contact from './Components/Contact';
import Donor from './Components/Donor';
import Footer from './Components/Footer';
import FormBuilder from './Components/FormBuilder';
import AboutUs from './Components/AboutUs';
import './App.css';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Pay />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/form" element={<FormBuilder />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donor" element={<Donor />} />
        
      </Routes>
    </Router> 
  );
}

export default App;

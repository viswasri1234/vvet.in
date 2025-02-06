import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to handle the hamburger menu toggle
  const navigate = useNavigate();

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar">
        <div className="brand">
          <img
            className="logo"
            src="https://img.freepik.com/premium-vector/college-logo-design-template-vector-illustration_139372-346.jpg"
            alt="College Logo"
          />
          <div className="brand-section">
            <h4 className="college-name" onClick={() => navigate("/")}>
              VETRIVEL EDUCATIONAL TRUST
            </h4>
            <p>A Legacy of Excellence in Education</p>
          </div>
        </div>

        {/* Hamburger icon */}
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>

        {/* Links */}
        <div className={`links ${menuOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/aboutUs">About Us</Link>
          <Link to="/register">Register</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

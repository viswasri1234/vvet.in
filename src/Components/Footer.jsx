import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        {/* First Section - Institution Name */}
        <div className="footer-section">
          <h3>Vetrivel Educational Trust</h3>
          <p>
            Vetrivel Educational Trust, founded in the year 2010.
            The nineteen founder trust members meticulously worked in setting up the best education 
            institution that can cater to the needs of the students.
          </p>
        </div>

        {/* Second Section - Important Links */}
        {/* <div className="footer-section">
          <h3>Important Links</h3>
          <ul>
            <li><a href="/terms-of-use">Terms of Use</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/disclaimer">Disclaimer</a></li>
            <li><a href="/sket-brochure">Sket Brochure</a></li>
          </ul>
        </div> */}

        {/* Third Section - Our Institutions */}
        {/* <div className="footer-section">
          <h3>Our Institutions</h3>

            <p>Sir M Visvesvaraya Institute of Technology</p>
            <p>Krishnadevaraya College of Dental Sciences & Hospital</p>
            <p>Sir M V School of Architecture</p>
  
        </div> */}

        {/* Fourth Section - Contact Us */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            Vetrivel Educational Trust<br />
            Bengaluru,Karnataka - 560080<br />
            Phone: (+91) 7604883357
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright 2023. All rights reserved. Designed by Outer Circle</p>
      </div>
    </div>
  );
};

export default Footer;

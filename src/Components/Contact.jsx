import React from 'react';
import { FaPhone, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="page contact">
      <h2>Contact Us</h2>
      <p>
        Email: <a href="mailto:VETRIVEL.EDUCATION.TRUST@gmail.com">VETRIVEL.EDUCATION.TRUST@gmail.com</a>
      </p>
      <p>
        <FaPhone /> <a href="tel:+917604883357">+91 9632828337</a>
      </p>
      <p>
        <FaLinkedin /> <a href="https://www.linkedin.com/in/vallies/" target="_blank" rel="noopener noreferrer">Valli's LinkedIn</a>
      </p>
      <p>
        <FaLinkedin /> <a href="https://www.linkedin.com/in/meena-v-8699579b/" target="_blank" rel="noopener noreferrer">Meena's LinkedIn</a>
      </p>
    </div>
  );
};

export default Contact;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import './Donate.css'

const Donate = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    // Navigate to the /register route when the button is clicked
    navigate('/register');
  };

  return (
    <Box
      className="donate-main-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        margin: 'auto'
      }}
    >
      <h1 className="heading-border-bottom" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
        Your Donation Can Make a Difference
      </h1>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Join us in our mission to help those in need. By becoming a donor, you can contribute to
        creating a positive impact in the lives of many.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRegisterClick}
        sx={{ padding: '10px 20px', backgroundColor:'rgb(255, 87, 34)' }}
      >
        Register to Donate
      </Button>
    </Box>
  );
};

export default Donate;

import React from 'react';
import { Button, Typography, Box, Grid, Icon } from '@mui/material';
import { AccessAlarm, School, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomeMockSection = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/form?type=neetmock');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        borderRadius: '8px',
        margin: 'auto',
      }}
    >
       <h1 className="heading-border-bottom">
            NEET Mock Tests Powered by Vidhai
      </h1>

      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Prepare for NEET with high-quality mock tests designed to give you the best practice before the big exam. 
        With Vidhai's mock tests, you can assess your performance and get feedback that helps you improve.
      </Typography>

      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Icon sx={{ fontSize: 40, color: '#FF5722' }}>
              <School />
            </Icon>
            <Typography variant="h6" sx={{ marginTop: '10px' }}>
              High-Quality Practice
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              Real exam-like questions to give you an accurate experience.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Icon sx={{ fontSize: 40, color: '#FF5722' }}>
              <AccessAlarm />
            </Icon>
            <Typography variant="h6" sx={{ marginTop: '10px' }}>
              Time Management
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              Practice under time constraints to improve your speed and accuracy.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Icon sx={{ fontSize: 40, color: '#FF5722' }}>
              <CheckCircle />
            </Icon>
            <Typography variant="h6" sx={{ marginTop: '10px' }}>
              Instant Results
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              Receive immediate feedback on your performance after each test.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleRegisterClick}
        sx={{ padding: '10px 20px', fontSize: '16px',backgroundColor:'rgb(255, 87, 34)' }}
      >
        Register Now
      </Button>
    </Box>
  );
};

export default HomeMockSection;

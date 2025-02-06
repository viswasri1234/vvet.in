import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";

const Register = () => {
  const [step, setStep] = useState(1); // Track the form step (1 for basic info, 2 for donation)
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    donationAmount: "",
  });

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const sendOTPviaEmail = () => {
    const payload = {
        userInfo, // Ensure `userInfo` is defined and contains valid data
    };
    fetch(`http://localhost:3333/api/v1/sendOTPviaEmail`, { // Correctly points to the backend route
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Payload is properly serialized
    })
    .then((response) => {
        console.log("response ==== ", response);
        if(response.ok && response.status == 200){
           setStep(2)
        }
    })
    .catch((error) => {
        console.log("error ===== ", error);
    });
};


  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      sendOTPviaEmail();
    } else {
      console.log("Form Data Submitted:", userInfo);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 5 }}>
      <Typography variant="h4" gutterBottom>
        Register and Donate
      </Typography>
      <Typography variant="body1" paragraph>
        Support our cause by donating. Your contributions help us make education
        accessible to all.
      </Typography>

      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          <>
            <Typography variant="h6" gutterBottom>
              Step 1: Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Next Step
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Step 2: Donation Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Donation Amount"
                  type="number"
                  name="donationAmount"
                  value={userInfo.donationAmount}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Donate Now
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </form>
    </Container>
  );
};

export default Register;

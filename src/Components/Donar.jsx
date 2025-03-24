import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Icon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Donar = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "40px 0", backgroundColor: "#f9f9f9" }}>
      <Container maxWidth="lg">
        <h1 className='heading-border-bottom'>Donar</h1>

        <Grid container spacing={4}>
          {/* History Section */}
          <Grid item xs={12} md={12}>
            <Box
            >
              <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: "bold" }}>
                Our History
              </Typography>
              <Typography variant="body1" paragraph>
                Vertivel Educational Trust was founded in 2010 with a vision to
                provide quality education to underprivileged children in rural
                and underserved areas. Over the years, the trust has grown into
                a leading educational organization that has impacted the lives
                of over 1000 children through various initiatives and
                educational programs.
              </Typography>
            </Box>
          </Grid>

          {/* Achievements Section */}
          <Grid item xs={12} md={12}>
            <Box
            >
              <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: "bold" }}>
                Our Achievements
              </Typography>
              <Typography variant="body1" paragraph>
                - Provided scholarships to over 100 students.
                <br />
                - Established 10 schools across rural regions.
                <br />
                - Partnered with top universities to offer vocational training.
                <br />
                - Awarded "Best Educational NGO" in 2018.
                <br />
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Goals Section */}
        <Box mt={4}>
          <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: "bold" }}>
            Our Future Goals
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.1rem", lineHeight: 1.6, color: "#555" }}
          >
            - Expand our reach to more than 1000 students by 2025.
            <br />
            - Introduce digital classrooms in remote areas.
            <br />
            - Collaborate with tech companies to provide online learning
            platforms.
            <br />
            - Establish a fund to support education in low-income families.
            <br />
          </Typography>
        </Box>

      {/* Address Section */}
      <Box mt={4}>
          <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: "bold" }}>
            Our Address
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.1rem", lineHeight: 1.6, color: "#555" }}
          >
            No 2, Melavayal kulakkal street opp to meenakshi natasen kalyana mandapam
            <br />
            Devakottai-630302
            <br />
          </Typography>
        </Box>

        <Box
          mt={4}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Button
            sx={{
              padding: "12px 30px",
              backgroundColor: "#FF5722",
              color: "#fff",
              "&:hover": { backgroundColor: "#e64a19" },
            }}
            href="/contact"
          >
            Contact Us
          </Button>

          <Box
            mt={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {/* <Icon sx={{ fontSize: "50px", color: "#FF5722" }}>school</Icon>
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              Join Us in Shaping the Future of Education!
            </Typography> */}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Donar
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import './CustomerCountCard.css'

const CustomerCountCard = () => {
  return (
    <Paper
      className="customer-count-card"
      elevation={3}
      sx={{
        padding: 4,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
            }}
          >
            110+
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "medium",
            }}
          >
            Customers have trusted us <br />
            for quality education services.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CustomerCountCard;

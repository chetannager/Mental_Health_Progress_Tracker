import React from "react";
import { TextField, Typography, Box, Rating, Grid } from "@mui/material";

const SleepPatterns = ({
  hours,
  quality,
  disturbances,
  onHoursChange,
  onQualityChange,
  onDisturbancesChange,
}) => {
  return (
    <Grid container flexDirection="column">
      <TextField
        label="Hours of Sleep"
        type="number"
        value={hours}
        onChange={(e) => onHoursChange(e.target.value)}
        variant="filled"
        sx={{
          mb: 3,
        }}
      />
      <Typography component="legend">Quality of Sleep</Typography>
      <Rating
        name="sleep-quality"
        value={quality}
        onChange={(e, newValue) => onQualityChange(newValue)}
        sx={{
          mb: 3,
        }}
        size="large"
      />
      <Typography component="legend">Sleep Disturbances</Typography>
      <Rating
        name="sleep-disturbances"
        size="large"
        value={disturbances}
        onChange={(e, newValue) => onDisturbancesChange(newValue)}
      />
    </Grid>
  );
};

export default SleepPatterns;

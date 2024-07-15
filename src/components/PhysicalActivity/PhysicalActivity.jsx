import React from "react";
import { TextField, MenuItem, Box, Grid } from "@mui/material";

const activityTypes = [
  "Running",
  "Walking",
  "Cycling",
  "Gym",
  "Yoga",
  "Others",
];

const PhysicalActivity = ({
  type,
  duration,
  onTypeChange,
  onDurationChange,
}) => {
  return (
    <Grid container>
      <TextField
        select
        label="Type of Activity"
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        variant="filled"
        fullWidth
        sx={{
          mb: 3,
        }}
      >
        {activityTypes.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Duration (minutes)"
        type="number"
        value={duration}
        onChange={(e) => onDurationChange(e.target.value)}
        variant="filled"
        fullWidth
      />
    </Grid>
  );
};

export default PhysicalActivity;

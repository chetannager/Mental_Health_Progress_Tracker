import React from "react";
import { Slider, Box, Typography } from "@mui/material";

const StressLevels = ({ value, onChange }) => {
  return (
    <Slider
      value={value}
      onChange={(e, newValue) => onChange(newValue)}
      min={0}
      max={10}
      step={1}
      marks={[
        { value: 0, label: "No Stress" },
        { value: 10, label: "Extreme" },
      ]}
      valueLabelDisplay="auto"
      sx={{
        mx: 5,
        width: "50%",
      }}
    />
  );
};

export default StressLevels;

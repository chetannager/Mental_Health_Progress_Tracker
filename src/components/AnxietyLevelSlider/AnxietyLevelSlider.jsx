import React from "react";
import Slider from "@mui/material/Slider";

const AnxietyLevelSlider = ({ value, onChange }) => {
  return (
    <Slider
      value={value}
      onChange={(e, newValue) => onChange(newValue)}
      min={0}
      max={10}
      step={1}
      marks={[
        { value: 0, label: "No Anxiety" },
        { value: 10, label: "Extreme Anxiety" },
      ]}
      valueLabelDisplay="auto"
      sx={{
        mx: 5,
        width: "50%",
      }}
    />
  );
};

export default AnxietyLevelSlider;

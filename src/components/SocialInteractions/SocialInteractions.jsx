import React from "react";
import { TextField, Box, Typography } from "@mui/material";

const SocialInteractions = ({ value, onChange }) => {
  return (
    <Box>
      <TextField
        fullWidth
        label="Social Interactions"
        variant="filled"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
};

export default SocialInteractions;

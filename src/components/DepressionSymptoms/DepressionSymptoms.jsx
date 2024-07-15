import React from "react";
import { TextField, Box, Typography } from "@mui/material";

const DepressionSymptoms = ({ value, onChange }) => {
  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Presence and severity of specific symptoms
      </Typography>
      <TextField
        fullWidth
        label="Symptoms of Depression or Anxiety"
        variant="filled"
        multiline
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
};

export default DepressionSymptoms;

import { Box } from "@mui/material";
import Spinner from "../Spinner";

function Preloader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "75vh",
        overflow: "hidden",
      }}
    >
      <Spinner thickness={5.0} />
    </Box>
  );
}

export default Preloader;

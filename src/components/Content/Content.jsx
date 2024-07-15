import { Container, Box, Toolbar } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home.jsx";
import Account from "../../pages/Account/Account.jsx";
import AddDailyLog from "../../pages/AddDailyLog/AddDailyLog.jsx";

function Content() {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-account" element={<Account />} />
          <Route path="/add-daily-log" element={<AddDailyLog />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default Content;

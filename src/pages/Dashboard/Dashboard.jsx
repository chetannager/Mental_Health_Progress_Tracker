import { Grid, CssBaseline } from "@mui/material";
import AppBar from "../../components/AppBar/AppBar";
import Drawer from "../../components/Drawer/Drawer";
import Content from "../../components/Content/Content";
import { useState } from "react";

function Dashboard() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Grid container>
      <CssBaseline />
      <AppBar open={open} toggleDrawer={toggleDrawer} />
      <Drawer open={open} toggleDrawer={toggleDrawer} />
      <Content />
    </Grid>
  );
}

export default Dashboard;

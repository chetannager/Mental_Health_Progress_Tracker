import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Grid, ListItem, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LunaJoyLogo from "../LunaJoyLogo/LunaJoyLogo.jsx";
import { Dashboard, FitnessCenter } from "@mui/icons-material";

const drawerWidth = 250;

const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function Drawer(props) {
  const { toggleDrawer, open } = props;
  const navigate = useNavigate();

  return (
    <CustomDrawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
        }}
      >
        <Grid container>
          <Typography
            component="h4"
            variant="h6"
            color="inherit"
            noWrap
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/">
              <LunaJoyLogo
                width="160px"
                style={{ position: "relative", top: "8px" }}
              />
            </Link>
          </Typography>
        </Grid>
        <Tooltip title="Close Drawer">
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <Divider />
      <List component="nav">
        <ListSubheader component="div">
          {open ? "Main Menu" : "Menu"}
        </ListSubheader>
        <Tooltip title={!open && "Dashboard"} placement="right">
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </Tooltip>
        <Tooltip title={!open && "Dialy Log"} placement="right">
          <ListItem disablePadding onClick={() => navigate("/add-daily-log")}>
            <ListItemButton>
              <ListItemIcon>
                <FitnessCenter />
              </ListItemIcon>
              <ListItemText primary="Log" />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </List>
    </CustomDrawer>
  );
}

export default Drawer;

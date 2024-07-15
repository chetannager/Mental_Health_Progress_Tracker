import { useContext, useState } from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Divider, ListItemIcon, styled, Tooltip } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { auth } from "../../utils/firebase.jsx";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../contexts/ThemeContext.jsx";
import { DarkMode, LightMode, ModeNight } from "@mui/icons-material";
import webSocketService from "../../utils/websocketService.jsx";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 250;

const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar = (props) => {
  const { toggleDrawer, open } = props;

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { displayName, email, photoURL } = currentUser;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { themeMode, toggleTheme } = useThemeContext();
  const [anchorThemeEl, setAnchorThemeEl] = useState(null);

  const handleThemeClick = (event) => {
    setAnchorThemeEl(event.currentTarget);
  };

  const handleThemeClose = () => {
    setAnchorThemeEl(null);
  };

  return (
    <CustomAppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <Tooltip title="Open Drawer">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mental Health Progress Tracker
        </Typography>

        <Tooltip title="Choose Theme">
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleThemeClick}
            color="inherit"
          >
            {themeMode == "system" && <ModeNight />}
            {themeMode == "light" && <LightMode />}
            {themeMode == "dark" && <DarkMode />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 35, height: 35 }}
              src={currentUser.photoURL}
              alt={currentUser.displayName}
            />
          </IconButton>
        </Tooltip>

        <Menu
          id="simple-menu"
          anchorEl={anchorThemeEl}
          keepMounted
          open={Boolean(anchorThemeEl)}
          onClose={handleThemeClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              toggleTheme("light");
              handleThemeClose();
            }}
          >
            <ListItemIcon>
              <LightMode fontSize="small" />
            </ListItemIcon>
            Light Theme
          </MenuItem>
          <MenuItem
            onClick={() => {
              toggleTheme("dark");
              handleThemeClose();
            }}
          >
            <ListItemIcon>
              <DarkMode fontSize="small" />
            </ListItemIcon>
            Dark Theme
          </MenuItem>
          <MenuItem
            onClick={() => {
              toggleTheme("system");
              handleThemeClose();
            }}
          >
            <ListItemIcon>
              <ModeNight fontSize="small" />
            </ListItemIcon>
            System Theme
          </MenuItem>
        </Menu>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Box sx={{ px: 2, display: "flex", alignItems: "center" }}>
            <Avatar
              src={photoURL}
              alt={displayName}
              sx={{ width: 35, height: 35 }}
            />
            <Box sx={{ ml: 1 }}>
              <Typography variant="subtitle1">{displayName}</Typography>
              <Typography variant="body2" color="textSecondary">
                {email}
              </Typography>
            </Box>
          </Box>

          <Divider />

          <MenuItem
            onClick={() => {
              auth.signOut();
              webSocketService.disconnect();
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </CustomAppBar>
  );
};

export default AppBar;

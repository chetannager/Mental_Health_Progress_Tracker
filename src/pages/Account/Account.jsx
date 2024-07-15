import {
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";
import { Tabs, Tab, Box, DialogActions } from "@mui/material";
import { Link } from "react-router-dom";
import { spacing } from "@mui/system";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import {
  PinDropOutlined,
  SettingsOutlined,
  AddOutlined,
  PersonTwoTone,
  DescriptionTwoTone,
  PinDropTwoTone,
  VisibilityOutlined,
  VisibilityOffOutlined,
  AccountCircle,
  Lock,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import classNames from "classnames";
import { AuthContext } from "../../contexts/AuthContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
      margin: spacing(1),
    },
    dateTimePicker: {
      width: "100%",
      "& > *": {
        margin: theme.spacing(1),
        width: "100%",
      },
    },
    TabPanel: {
      // flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      // display: 'flex',
      height: 500,
    },
    tabs: {
      margin: theme.spacing(1),
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
}));

function Account() {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

  const [isProcessing, setProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid spacing={1}>
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" to="/">
            Home
          </Link>
          <Typography color="text.primary">My Account</Typography>
        </Breadcrumbs>
      </Grid>

      <Card className={classes.root}>
        <CardContent>
          <div className={classes.TabPanel}>
            <Grid container direction="column">
              <Avatar
                src={currentUser.photoURL}
                alt={currentUser.displayName}
              />
              <Typography variant="h6">{currentUser.displayName}</Typography>
              <Typography variant="body1">{currentUser.email}</Typography>
              <Typography variant="body2">
                Google Account Created At:{" "}
                {new Date(
                  currentUser.metadata.creationTime
                ).toLocaleDateString()}
              </Typography>
            </Grid>
            <DialogActions hidden></DialogActions>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Account;

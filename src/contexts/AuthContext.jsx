import { createContext, useState, useEffect } from "react";
import { auth } from "../utils/firebase.jsx";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import LunaJoyLogo from "../components/LunaJoyLogo/LunaJoyLogo.jsx";
import Spinner from "../components/Spinner/index.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "200px",
    "& > * + *": {
      marginTop: "16px",
    },
  },
}));

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {loading ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -85%)",
            opacity: "1",
          }}
        >
          <Grid
            container
            flexDirection="column"
            justifyContent="start"
            alignItems="center"
            spacing={4}
          >
            <Grid item>
              <LunaJoyLogo
                width="250px"
                style={{ position: "relative", top: "15px" }}
              />
            </Grid>
            <Grid item>
              <div className={classes.root} style={{ textAlign: "center" }}>
                <Spinner thickness={5.0} />
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { AuthContext } from "../../AuthContext.jsx";
import { Grid, LinearProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "200px",
    "& > * + *": {
      marginTop: "16px",
    },
  },
}));

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
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
              <img
                src="https://images.squarespace-cdn.com/content/v1/61d282d9482bc202ee4e8253/16c8562e-90db-4fbf-be51-a1ce5b15514c/logo.png?format=1500w"
                width="160px"
                style={{ position: "relative", top: "15px" }}
              />
            </Grid>
            <Grid item>
              <div className={classes.root}>
                <LinearProgress />
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Routes>
          <Route
            {...rest}
            element={
              currentUser ? <Component {...rest} /> : <Navigate to="/login" />
            }
          />
        </Routes>
      )}
    </>
  );
};

export default ProtectedRoute;

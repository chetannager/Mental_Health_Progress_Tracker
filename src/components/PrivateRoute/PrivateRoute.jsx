import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../AuthContext.jsx";

const PrivateRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route
      {...rest}
      element={isLoggedIn ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;

import { Route, Navigate, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext.jsx";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={(props) =>
          currentUser && restricted ? (
            <Navigate to="/" />
          ) : (
            <Component {...props} />
          )
        }
      />
    </Routes>
  );
};

export default PublicRoute;

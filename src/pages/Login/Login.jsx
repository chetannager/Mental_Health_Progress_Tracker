import { Grid } from "@mui/material";
import { auth, googleProvider } from "../../utils/firebase.jsx";
import { signInWithPopup, getIdToken } from "firebase/auth";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import LunaJoyLogo from "../../components/LunaJoyLogo/LunaJoyLogo.jsx";
import { useThemeContext } from "../../contexts/ThemeContext.jsx";
import webSocketService from "../../utils/websocketService.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { themeMode } = useThemeContext();

  const signInWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const idToken = await getIdToken(auth.currentUser);
        fetch(import.meta.env.VITE_BASE_API_URL + "auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            email: result.user.email,
          }),
        }).then(() => {
          // for websocket to retrive data for visualization
          //webSocketService.setToken(idToken);
          //webSocketService.connect();
          navigate("/");
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <>
      <Grid container>
        <Grid
          sx={{
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
              <GoogleButton
                type={themeMode === "dark" ? "light" : "dark"}
                onClick={signInWithGoogle}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export default Login;

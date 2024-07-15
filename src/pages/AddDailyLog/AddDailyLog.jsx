import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MoodRatingSlider from "../../components/MoodRatingSlider/MoodRatingSlider.jsx";
import AnxietyLevelSlider from "../../components/AnxietyLevelSlider/AnxietyLevelSlider.jsx";
import SleepPatterns from "../../components/SleepPatterns/SleepPatterns.jsx";
import PhysicalActivity from "../../components/PhysicalActivity/PhysicalActivity.jsx";
import SocialInteractions from "../../components/SocialInteractions/SocialInteractions.jsx";
import StressLevels from "../../components/StressLevels/StressLevels.jsx";
import DepressionSymptoms from "../../components/DepressionSymptoms/DepressionSymptoms.jsx";
import { auth, googleProvider } from "../../utils/firebase.jsx";
import { signInWithPopup, getIdToken } from "firebase/auth";
import { LoadingButton } from "@mui/lab";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "../../components/Preloader";
import axios from "axios";

const AddDailyLog = () => {
  const navigate = useNavigate();
  const [mood, setMood] = useState(4);
  const [anxiety, setAnxiety] = useState(5);
  const [sleepHours, setSleepHours] = useState("");
  const [sleepQuality, setSleepQuality] = useState(3);
  const [sleepDisturbances, setSleepDisturbances] = useState(2);
  const [activityType, setActivityType] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [socialInteractions, setSocialInteractions] = useState("");
  const [stressLevel, setStressLevel] = useState(3);
  const [depressionSymptoms, setDepressionSymptoms] = useState("");
  const [isProcessing, setProcessing] = useState(false);
  const [logExists, setLogExists] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState(null);

  const calculateRemainingTime = () => {
    const now = new Date();
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0);

    const timeDifference = nextMidnight - now;
    setRemainingTime(timeDifference);

    const interval = setInterval(() => {
      const updatedTimeDifference = nextMidnight - new Date();
      setRemainingTime(updatedTimeDifference);

      if (updatedTimeDifference <= 0) {
        clearInterval(interval);
        setLogExists(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  const handleValidation = () => {
    return (
      mood !== "" &&
      anxiety !== "" &&
      sleepHours !== "" &&
      activityType !== "" &&
      activityDuration !== "" &&
      socialInteractions !== "" &&
      stressLevel !== "" &&
      depressionSymptoms !== ""
    );
  };

  const handleSubmit = async () => {
    if (handleValidation()) {
      setProcessing(true);
      const logData = {
        mood,
        anxiety,
        sleepHours,
        sleepQuality,
        sleepDisturbances,
        activityType,
        activityDuration,
        socialInteractions,
        stressLevel,
        depressionSymptoms,
      };

      const idToken = await getIdToken(auth.currentUser);

      fetch(import.meta.env.VITE_BASE_API_URL + "log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(logData),
      })
        .then((response) => {
          toast.success("Log submitted successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setProcessing(false);
          setLogExists(true);
          console.log("Log submitted successfully:", response);
        })
        .catch((error) => {
          setProcessing(false);
          console.error("Error submitting log:", error);
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

  useEffect(() => {
    const checkLogExists = async () => {
      setLoading(true);
      const idToken = await getIdToken(auth.currentUser);

      axios
        .get(import.meta.env.VITE_BASE_API_URL + "log", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        })
        .then((response) => {
          setLoading(false);
          if (response.status == 200) {
            setLogExists(response.data.isTodayLogAdded);
            calculateRemainingTime();
          }
        })
        .catch((error) => {
          console.log("error " + error);
        });
    };

    checkLogExists();
  }, []);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <Grid spacing={1}>
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
              <Link underline="hover" color="inherit" to="/">
                Home
              </Link>
              <Typography color="text.primary">Add Daily Log</Typography>
            </Breadcrumbs>
          </Grid>

          {logExists ? (
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{
                minHeight: "500px",
              }}
            >
              <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>
                You have already submitted a log for today. You can submit a new
                log after that: {formatTime(remainingTime)}
              </Typography>
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate("/")}
                >
                  Explore Dashboard
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Card id="uploadExcelCard">
              <CardContent>
                <Typography
                  variant="h5"
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    margin: "5px 0px",
                  }}
                >
                  Add Daily Log (Date : {new Date().toISOString().split("T")[0]}
                  )
                </Typography>
                <Typography
                  variant="p"
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    display: "flex",
                    margin: "5px 0px 20px",
                  }}
                >
                  Please submit your daily health staus.
                </Typography>
                <Box mb={4}>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    Mood Ratings
                  </Typography>
                  <Grid container justifyContent="center" alignItems="center">
                    <MoodRatingSlider value={mood} onChange={setMood} />
                  </Grid>
                </Box>
                <Box mb={4}>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    Anxiety Level
                  </Typography>
                  <Grid container justifyContent="center" alignItems="center">
                    <AnxietyLevelSlider value={anxiety} onChange={setAnxiety} />
                  </Grid>
                </Box>
                <Box mb={4}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Sleep Patterns
                  </Typography>
                  <Grid container justifyContent="center" alignItems="center">
                    <SleepPatterns
                      hours={sleepHours}
                      quality={sleepQuality}
                      disturbances={sleepDisturbances}
                      onHoursChange={setSleepHours}
                      onQualityChange={setSleepQuality}
                      onDisturbancesChange={setSleepDisturbances}
                    />
                  </Grid>
                </Box>
                <Box mb={4}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Physical Activity
                  </Typography>
                  <Grid container justifyContent="center" alignItems="center">
                    <PhysicalActivity
                      type={activityType}
                      duration={activityDuration}
                      onTypeChange={setActivityType}
                      onDurationChange={setActivityDuration}
                    />
                  </Grid>
                </Box>
                <Box mb={4}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Social Interactions
                  </Typography>
                  <Grid container justifyContent="center" alignItems="center">
                    <SocialInteractions
                      value={socialInteractions}
                      onChange={setSocialInteractions}
                    />
                  </Grid>
                </Box>
                <Box mb={4}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Stress Levels
                  </Typography>
                  <Grid container justifyContent="center" alignItems="center">
                    <StressLevels
                      value={stressLevel}
                      onChange={setStressLevel}
                    />
                  </Grid>
                </Box>
                <Box mb={4}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Symptoms of Depression or Anxiety
                  </Typography>
                  <Grid container justifyContent="center" alignItems="center">
                    <DepressionSymptoms
                      value={depressionSymptoms}
                      onChange={setDepressionSymptoms}
                    />
                  </Grid>
                </Box>

                <Box textAlign="right">
                  <LoadingButton
                    loading={isProcessing}
                    loadingPosition="end"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    <span>Submit</span>
                  </LoadingButton>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      )}

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

export default AddDailyLog;

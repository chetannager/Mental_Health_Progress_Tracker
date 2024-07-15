import { Alert, Grid, Paper, Typography } from "@mui/material";
import Analytics from "./Analytics.jsx";
import Chart from "./Chart.jsx";
import Activity from "./Activity.jsx";
import Logs from "./Logs.jsx";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../../utils/firebase.jsx";
import { signInWithPopup, getIdToken } from "firebase/auth";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import Title from "../../components/Title/Title.jsx";

const moodImages = [
  {
    src: "https://emojiisland.com/cdn/shop/products/Very_sad_emoji_icon_png_large.png?v=1571606089",
    label: "Very Sad",
    rating: 0,
  },
  {
    src: "https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Sad_Emoji_large.png?v=1571606093",
    label: "Sad",
    rating: 1,
  },
  {
    src: "https://emojiisland.com/cdn/shop/products/Neutral_Face_Emoji_large.png?v=1571606037",
    label: "Neutral",
    rating: 2,
  },
  {
    src: "https://emojiisland.com/cdn/shop/products/Happy_Emoji_Icon_5c9b7b25-b215-4457-922d-fef519a08b06_large.png?v=1571606090",
    label: "Happy",
    rating: 3,
  },
  {
    src: "https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Happy_large.png?v=1571606093",
    label: "Very Happy",
    rating: 4,
  },
];

function getMoodRatingImageSource(avg_mood_rating) {
  const moodImage = moodImages.find(
    (image) => image.rating === avg_mood_rating
  );

  return moodImage ? moodImage.src : "default_image_url_here";
}

function Home() {
  const [isLoading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({});

  const fetchDashboardAnalytics = async () => {
    setLoading(true);
    const idToken = await getIdToken(auth.currentUser);

    axios
      .get(import.meta.env.VITE_BASE_API_URL + "logs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setAnalyticsData(response.data);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  useEffect(() => {
    fetchDashboardAnalytics();
  }, []);

  return (
    <Grid container spacing={3} flexDirection={"column"}>
      {!analyticsData.isTodayLogAdded && !isLoading && (
        <Grid item container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Alert severity="info">
              You have not submitted today mental health log. Please submit go
              here and then check your dashboard :{" "}
              <Link to="/add-daily-log">Submit Log</Link>
            </Alert>
          </Grid>
        </Grid>
      )}

      {/* First Row */}
      <Grid item container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Analytics
            title="Total Daily Logs"
            count={
              isLoading ? (
                <Spinner size={20} thickness={7.0} />
              ) : (
                <Typography variant="h5" color="inherit">
                  {analyticsData.totalLogsAdded == 0
                    ? "..."
                    : analyticsData.totalLogsAdded}
                </Typography>
              )
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Analytics
            title="Average Mood"
            count={
              isLoading ? (
                <Spinner size={20} thickness={7.0} />
              ) : (
                <Typography variant="h5" color="inherit">
                  {analyticsData.mood_rating == 0 ? (
                    <Typography variant="h5" sx={{ ml: 1 }} color="inherit">
                      ...
                    </Typography>
                  ) : (
                    <img
                      src={getMoodRatingImageSource(analyticsData.mood_rating)}
                      width="25"
                    />
                  )}
                </Typography>
              )
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Analytics
            title="Average Anxiety Level"
            count={
              isLoading ? (
                <Spinner size={20} thickness={7.0} />
              ) : (
                <Grid
                  container
                  justifyContent="center"
                  flexDirection="row"
                  alignItems="center"
                >
                  {analyticsData.anxiety_level == 0 ? (
                    <Typography variant="h5" sx={{ ml: 1 }} color="inherit">
                      ...
                    </Typography>
                  ) : (
                    <>
                      <Grid display="flex" item>
                        <img
                          src="https://emojiisland.com/cdn/shop/products/Cold_Sweat_Emoji_large.png?v=1571606037"
                          width="25"
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" sx={{ ml: 1 }} color="inherit">
                          {analyticsData.anxiety_level}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              )
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Analytics
            title="Average Sleep Hours"
            count={
              isLoading ? (
                <Spinner size={20} thickness={7.0} />
              ) : (
                <Grid
                  container
                  justifyContent="center"
                  flexDirection="row"
                  alignItems="center"
                >
                  {analyticsData.sleep_hours == 0 ? (
                    <Typography variant="h5" sx={{ ml: 1 }} color="inherit">
                      ...
                    </Typography>
                  ) : (
                    <>
                      <Grid display="flex" item>
                        <img
                          src="https://emojiisland.com/cdn/shop/products/Sleeping_Emoji_large.png?v=1571606036"
                          width="25"
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" sx={{ ml: 1 }} color="inherit">
                          {analyticsData.sleep_hours}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              )
            }
          />
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid item container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 340,
            }}
          >
            <Title>Metrics Over Days</Title>
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{
                minHeight: "250px",
              }}
            >
              {isLoading ? (
                <Spinner size={20} thickness={7.0} />
              ) : analyticsData.totalLogsAdded == 0 ? (
                " No data found"
              ) : (
                <Chart logs={analyticsData.logs} />
              )}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 340,
            }}
          >
            <Title>Activity Percentage</Title>
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{
                minHeight: "250px",
              }}
            >
              {isLoading ? (
                <Spinner size={20} thickness={7.0} />
              ) : analyticsData.totalLogsAdded == 0 ? (
                " No data found"
              ) : (
                <Activity
                  activityPercentages={analyticsData.activityPercentages}
                />
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Third Row */}
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Title>Recent Logs</Title>
          <Grid
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{
              minHeight: "250px",
            }}
          >
            {isLoading ? (
              <Spinner size={20} thickness={7.0} />
            ) : analyticsData.totalLogsAdded == 0 ? (
              "No data found"
            ) : (
              <Logs
                logs={analyticsData.logs}
                getMoodRatingImageSource={getMoodRatingImageSource}
              />
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Home;

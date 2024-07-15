import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "../../components/Title";
import { Grid } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Activity(props) {
  const { activityPercentages } = props;

  return (
    <React.Fragment>
      <Grid container spacing={2} justifyContent="center">
        {activityPercentages.map((activity, index) => (
          <Grid item xs={4} key={index}>
            <div style={{ width: "100px", margin: "auto" }}>
              <CircularProgressbar
                value={parseFloat(activity.percentage)}
                text={`${activity.percentage}%`}
                styles={buildStyles({
                  textSize: "16px",
                  pathColor: "#3f51b5",
                  textColor: "#3f51b5",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#e0e0e0",
                })}
              />
            </div>
            <Typography variant="subtitle1" align="center">
              {activity.activity_type}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}

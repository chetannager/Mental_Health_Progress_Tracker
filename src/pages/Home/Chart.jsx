import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";
import Title from "../../components/Title";

function createData(logs) {
  return logs
    .map((log) => ({
      day: new Date(log.date).toLocaleDateString(),
      moodRating: log.mood_rating,
      anxietyLevel: log.anxiety_level,
      sleepHours: log.sleep_hours,
    }))
    .sort((a, b) => new Date(b.day) - new Date(a.day));
}

export default function Chart(props) {
  const { logs } = props;
  const theme = useTheme();

  const data = createData(logs);

  return (
    <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
      <LineChart
        dataset={data}
        margin={{
          top: 16,
          right: 20,
          left: 70,
          bottom: 30,
        }}
        xAxis={[
          {
            scaleType: "point",
            dataKey: "day",
            tickNumber: data.length,
            tickLabelStyle: theme.typography.body2,
          },
        ]}
        yAxis={[
          {
            label: "Values",
            labelStyle: {
              ...theme.typography.body1,
              fill: theme.palette.text.primary,
            },
            tickLabelStyle: theme.typography.body2,
            max: 10,
            tickNumber: 5,
          },
        ]}
        series={[
          {
            dataKey: "moodRating",
            label: "Mood Rating",
            showMark: false,
            color: theme.palette.primary.light,
          },
          {
            dataKey: "anxietyLevel",
            label: "Anxiety Level",
            showMark: false,
            color: theme.palette.secondary.light,
          },
          {
            dataKey: "sleepHours",
            label: "Sleep Hours",
            showMark: false,
            color: theme.palette.info.light,
          },
        ]}
        sx={{
          [`.${axisClasses.root} line`]: {
            stroke: theme.palette.text.secondary,
          },
          [`.${axisClasses.root} text`]: {
            fill: theme.palette.text.secondary,
          },
          [`& .${axisClasses.left} .${axisClasses.label}`]: {
            transform: "translateX(-25px)",
          },
        }}
      />
    </div>
  );
}

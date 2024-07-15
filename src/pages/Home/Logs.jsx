import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../components/Title";

export default function Logs(props) {
  const { logs, getMoodRatingImageSource } = props;
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Mood Rating</TableCell>
          <TableCell>Anxiety Level</TableCell>
          <TableCell>Sleep Hours</TableCell>
          <TableCell>Physical Activity Type</TableCell>
          <TableCell>Physical Activity Duration</TableCell>
          <TableCell>Social Interactions</TableCell>
          <TableCell>Stress Level</TableCell>
          <TableCell>Depression Symptoms</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {logs.map((log, index) => (
          <TableRow key={log.log_id}>
            <TableCell>{new Date(log.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <img src={getMoodRatingImageSource(log.mood_rating)} width="25" />
            </TableCell>
            <TableCell>{log.anxiety_level}</TableCell>
            <TableCell>{log.sleep_hours}</TableCell>
            <TableCell>{log.physical_activity_type}</TableCell>
            <TableCell>{log.physical_activity_duration}</TableCell>
            <TableCell>{log.social_interactions}</TableCell>
            <TableCell>{log.stress_level}</TableCell>
            <TableCell>{log.depression_symptoms}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

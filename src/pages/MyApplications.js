// src/pages/MyApplications.js
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { List, ListItem, Typography, Badge, Chip, Grid } from '@mui/material';
import { CheckCircleOutline, HourglassEmpty } from '@mui/icons-material';

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const q = query(
          collection(db, "applications"),
          where("userId", "==", "unique-user-id-3") // Replace with actual user ID
        );

        const querySnapshot = await getDocs(q);
        const applicationList = await Promise.all(
          querySnapshot.docs.map(async (applicationDoc) => {
            const application = applicationDoc.data();

            // Use the correct syntax to get the project document
            const projectDocRef = doc(db, "projects", application.projectId);
            const projectSnapshot = await getDoc(projectDocRef);
            return {
              id: applicationDoc.id,
              ...application,
              project: projectSnapshot.exists() ? projectSnapshot.data() : null,
            };
          })
        );

        setApplications(applicationList);

        console.log("Applications with Project Data:", applicationList);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);
  const getStatusBadge = (status) => {
    return status === "approved" ? (
      <Chip
        icon={<CheckCircleOutline style={{ color: "green" }} />}
        label="Approved"
        color="success"
        variant="outlined"
      />
    ) : (
      <Chip
        icon={<HourglassEmpty style={{ color: "orange" }} />}
        label="Pending"
        color="warning"
        variant="outlined"
      />
    );
  };

  return (
    <List>
      {applications.map((app) => (
        <ListItem
          key={app.id}
          sx={{
            marginBottom: 2,
            padding: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography variant="h6">
                {app.project?.title}{" "}
                <Badge badgeContent={getStatusBadge(app.status)} />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" color="textSecondary">
                Status: {app.status}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                {app.project?.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                <strong>Domain:</strong> {app.project?.domain}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Client:</strong> {app.project?.client}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Duration:</strong> {app.project?.duration}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Skills Required:</strong>{" "}
                {app.project?.skillsRequired.join(", ")}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
}

export default MyApplications;

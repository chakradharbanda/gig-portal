import React, { useState, useEffect } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ProjectDetailsDialog = ({
  open,
  handleClose,
  project,
  projectId,
  readOnly,
  user,
}) => {
  const [application, setApplication] = useState({
    userId: user.userId,
  });
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const checkIfApplied = async () => {
      try {
        const q = query(
          collection(db, "applications"),
          where("userId", "==", user.userId),
          where("projectId", "==", projectId)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setHasApplied(true); // User has already applied to this project
        } else {
          setHasApplied(false);
        }
      } catch (error) {
        console.error("Error checking existing applications:", error);
      }
    };

    if (open && projectId && user.userId) {
      checkIfApplied();
    }
  }, [open, projectId, user.userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasApplied) {
      alert("You have already applied for this project.");
      return;
    }

    try {
      const applicationsRef = collection(db, "applications");
      await addDoc(applicationsRef, {
        projectId,
        ...application,
        status: "pending", // or 'submitted' based on your requirements
        createdAt: new Date(),
        // Add any additional fields you need here, e.g., user info, etc.
      });
      alert("Application submitted successfully");
      handleClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{project?.title || "Project Details"}</DialogTitle>
      <DialogContent dividers>
        {project ? (
          <>
            <Typography variant="body1" gutterBottom>
              {project.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Domain: {project.domain}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Client: {project.client}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Duration: {project.duration}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Status: {project.status}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Skills Required: {project.skillsRequired.join(", ")}
            </Typography>
            <Typography variant="body1" color="textPrimary">
              Applying for {user.name}
            </Typography>
          </>
        ) : (
          <Typography variant="body2">Loading...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        {!readOnly && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={hasApplied}
          >
            {hasApplied ? "Already Applied" : "Apply"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDetailsDialog;

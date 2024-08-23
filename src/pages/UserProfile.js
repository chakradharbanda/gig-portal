import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Icon,
} from "@mui/material";

function UserProfile({ user }) {
  return (
    <Box
      sx={{
        borderRadius: 1,
        maxWidth: 400,
        margin: "auto",
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" component="div" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Email: {user.email}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Role: {user.role}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        UserID: {user.userId}
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="subtitle1" component="div" gutterBottom>
          Skills:
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {user.skills.map((skill, index) => (
            <Chip key={index} label={skill} variant="outlined" />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default UserProfile;

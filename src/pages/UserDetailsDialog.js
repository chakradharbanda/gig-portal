import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const UserDetailsDialog = ({ open, handleClose, user }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent dividers>
        {user ? (
          <>
            <Typography variant="h6" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Role:</strong> {user.role}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Skills:</strong> {user.skills.join(', ')}
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
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsDialog;

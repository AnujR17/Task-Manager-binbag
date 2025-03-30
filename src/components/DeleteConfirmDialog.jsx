import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@mui/material';

// Simple confirmation dialog before permanently deleting tasks
// Takes three props - pretty straightforward to use
function DeleteConfirmDialog({ open, onClose, onConfirm }) {
  // open - controls visibility
  // onClose - what happens when user clicks Cancel or clicks away
  // onConfirm - triggers the actual deletion... be careful!
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disablePortal={false}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        Delete Task
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete this task? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {/* Red button for destructive actions - follows Material design guidelines */}
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmDialog;
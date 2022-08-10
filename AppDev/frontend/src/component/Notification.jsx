import * as React from 'react';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';

export default function Notification() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleClickOpen}
      >
        <Badge badgeContent={18} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Your notifications
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              User1 upload a video 3 min ago
            </DialogContentText>
            <DialogContentText>
              User1 upload a video 3 min ago
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Dismiss
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

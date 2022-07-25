import * as React from 'react';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Draggable from 'react-draggable';
import MailIcon from '@mui/icons-material/Mail';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import Paper from '@mui/material/Paper';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Paper {...props} />
    </Draggable>
  );
}

export default function DirectMsg() {
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
        aria-label="show 4 new mails"
        color="inherit"
        onClick={handleClickOpen}
      >
        <Badge badgeContent={5} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Direct messages
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              chat 1
            </DialogContentText>
            <DialogContentText>
              chat 2
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

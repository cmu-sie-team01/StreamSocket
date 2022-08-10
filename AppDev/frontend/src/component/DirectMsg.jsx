import * as React from 'react';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';
import {
  Dialog,
} from '@mui/material';

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
          aria-labelledby="draggable-dialog-title"
        >
          <div style={{ margin: '5%' }}>This feature is still Under construction</div>
        </Dialog>
      </div>
    </div>
  );
}

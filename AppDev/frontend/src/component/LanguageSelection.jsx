import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TranslateIcon from '@mui/icons-material/Translate';

// eslint-disable-next-line react/prop-types
export default function LanguageSelection(props) {
  const [open, setOpen] = React.useState(false);
  const languages = ['English', 'Chinese', 'Spanish'];
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleLanguageChange = (event) => {
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    props.changeSubLanguage(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TranslateIcon variant="outlined" onClick={handleClickOpen}>switch language</TranslateIcon>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Switch Language For Subtitle</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If the video is still processing, you will not see the captions.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="max-width">Languages</InputLabel>
              <Select
                autoFocus
                label="Languages"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
                onChange={handleLanguageChange}
              >
                {
                  languages.map((l) => <MenuItem value={l}>{l}</MenuItem>)
                }
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

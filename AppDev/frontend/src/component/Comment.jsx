import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AlignItemsList() {
  const [comment, setComments] = React.useState([]);
  // eslint-disable-next-line react/no-unstable-nested-components
  function CommentButton() {
    return (
      <Button
        onClick={(event) => {
          console.log(event.target.value);
          setComments(comment.concat(event.value));
        }}
      >
        Comment
      </Button>
    );
  }
  return (
    <div>
      <List sx={{
        width: '100%', maxWidth: 360, bgcolor: '#CD853F', borderRadius: '16px',
      }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Rick"
            secondary={(
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="caption"
                color="text.primary"
              >
                Perfect caption here
              </Typography>
          )}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Chris"
            secondary={(
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="caption"
                color="text.primary"
              >
                Nice video
              </Typography>
                      )}
          />
        </ListItem>
        {comment.map((c) => <div>{c}</div>)}
        <TextField
          id="standard-name"
          InputProps={{
            endAdornment: <CommentButton />,
          }}
          sx={{
            borderRadius: '16px',
            margin: '5%',
            marginTop: '0',
            color: '#757ce8',
          }}
        />

      </List>

    </div>
  );
}

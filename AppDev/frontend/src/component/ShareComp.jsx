import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import ShareIcon from '@mui/icons-material/Share';
import { Snackbar } from '@mui/material';

export default function ShareComp() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isCopied, SetCopied] = useState(false);
  console.log(isCopied);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    SetCopied(false);
  };
  const copy = () => {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    navigator.clipboard.writeText(el.value);
    document.body.removeChild(el);
    SetCopied(true);
    setAnchorEl(null);
  };
  const handleTwitter = () => {
    SetCopied(false);
    window.open('https://twitter.com/');
    setAnchorEl(null);
  };
  const handleIns = () => {
    SetCopied(false);
    window.open('https://www.instagram.com/');
    setAnchorEl(null);
  };
  return (

    <div>
      <div>
        <Snackbar
          open={isCopied}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Link is Copied"
          sx={{
            position: 'flex',
            marginLeft: '15%',
          }}
        />
      </div>

      <ShareIcon
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ display: 'flex' }}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={copy}>
          <ContentCopyIcon sx={{ paddingRight: '5%' }} />
          Copy Link
        </MenuItem>

        <MenuItem
          onClick={handleTwitter}
        >
          <TwitterIcon sx={{ paddingRight: '5%' }} />
          Twitter
        </MenuItem>
        <MenuItem onClick={handleIns}>
          <InstagramIcon sx={{ paddingRight: '5%' }} />
          Instagram
        </MenuItem>
      </Menu>
    </div>
  );
}

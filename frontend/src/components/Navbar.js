import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import FaceIcon from '@mui/icons-material/Face';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <FaceIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Face Recognition App
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
          <Button color="inherit" component={Link} to="/recognize">
            Recognize
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

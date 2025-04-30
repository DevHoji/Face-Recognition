import React from 'react';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import PeopleIcon from '@mui/icons-material/People';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Face Recognition System
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          A powerful application to register and recognize faces using computer vision
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PersonAddIcon sx={{ fontSize: 60, color: 'primary.main', my: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Register Face
            </Typography>
            <Typography variant="body1" paragraph sx={{ flex: 1 }}>
              Add a new user to the system by capturing their face and saving their information to the database.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/register"
              size="large"
              startIcon={<PersonAddIcon />}
              sx={{ mt: 2 }}
            >
              Register Now
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FaceRetouchingNaturalIcon sx={{ fontSize: 60, color: 'primary.main', my: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Recognize Face
            </Typography>
            <Typography variant="body1" paragraph sx={{ flex: 1 }}>
              Identify a person by capturing their face with the webcam or uploading an image containing a face.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/recognize"
              size="large"
              startIcon={<FaceRetouchingNaturalIcon />}
              sx={{ mt: 2 }}
            >
              Recognize Now
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PeopleIcon sx={{ fontSize: 60, color: 'primary.main', my: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              View Users
            </Typography>
            <Typography variant="body1" paragraph sx={{ flex: 1 }}>
              See a list of all registered users in the system and manage user entries in the database.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/users"
              size="large"
              startIcon={<PeopleIcon />}
              sx={{ mt: 2 }}
            >
              View Users
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;

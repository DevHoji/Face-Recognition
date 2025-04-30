import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Alert, Snackbar, Paper } from '@mui/material';
import WebcamCapture from '../components/WebcamCapture';
import axios from 'axios';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  
  const handleCapture = (blob) => {
    setImgFile(blob);
    setError('');
  };
  
  const handleRegister = async () => {
    // Validate inputs
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }
    
    if (!imgFile) {
      setError('Please capture a photo');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', imgFile, 'face.jpg');
      
      // Send registration request
      const response = await axios.post('/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Registration successful:', response.data);
      setSuccess(true);
      
      // Reset form
      setName('');
      setImgFile(null);
      
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.detail || 'Failed to register user. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSuccess(false);
  };
  
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register New User
        </Typography>
        
        <Box sx={{ mt: 4, mb: 3 }}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleNameChange}
            disabled={loading}
            sx={{ mb: 3 }}
          />
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Capture Face Image
          </Typography>
          
          <WebcamCapture 
            onCapture={handleCapture} 
            isLoading={loading}
            error={error}
          />
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleRegister}
            disabled={loading || !imgFile}
            startIcon={<PersonAddIcon />}
          >
            Register User
          </Button>
        </Box>
      </Paper>
      
      <Snackbar 
        open={success} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          User registered successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterPage;

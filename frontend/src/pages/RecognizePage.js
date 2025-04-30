import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Alert, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar,
  Divider,
  Tab,
  Tabs,
  Button,
  CircularProgress
} from '@mui/material';
import WebcamCapture from '../components/WebcamCapture';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HelpIcon from '@mui/icons-material/Help';

const RecognizePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [imgFile, setImgFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recognitionResult, setRecognitionResult] = useState(null);
  
  const handleCapture = (blob) => {
    setImgFile(blob);
    setError('');
    setRecognitionResult(null);
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgFile(file);
      setUploadedImageUrl(URL.createObjectURL(file));
      setError('');
      setRecognitionResult(null);
    }
  };
  
  const handleRecognize = async () => {
    if (!imgFile) {
      setError('Please capture or upload an image first');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', imgFile, 'face.jpg');
      
      // Send recognition request
      const response = await axios.post('/users/recognize', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Recognition result:', response.data);
      setRecognitionResult(response.data);
      
    } catch (err) {
      console.error('Recognition error:', err);
      setError(err.response?.data?.detail || 'Failed to recognize face. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setImgFile(null);
    setUploadedImageUrl('');
    setRecognitionResult(null);
    setError('');
  };
  
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Recognize Face
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Webcam" />
            <Tab label="Upload Image" />
          </Tabs>
        </Box>
        
        {tabValue === 0 && (
          <Box sx={{ mt: 3, mb: 3 }}>
            <WebcamCapture 
              onCapture={handleCapture} 
              isLoading={loading}
              error={error}
            />
          </Box>
        )}
        
        {tabValue === 1 && (
          <Box sx={{ mt: 3, mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
              accept="image/*"
              id="upload-image-file"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              disabled={loading}
            />
            <label htmlFor="upload-image-file">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                disabled={loading}
              >
                Upload Image
              </Button>
            </label>
            
            {uploadedImageUrl && (
              <Paper elevation={2} sx={{ mt: 3, p: 1, position: 'relative' }}>
                <img 
                  src={uploadedImageUrl} 
                  alt="Uploaded" 
                  style={{ maxWidth: '100%', maxHeight: '350px', display: 'block' }} 
                />
                {loading && (
                  <Box sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)' 
                  }}>
                    <CircularProgress color="primary" />
                  </Box>
                )}
              </Paper>
            )}
          </Box>
        )}
        
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
            onClick={handleRecognize}
            disabled={loading || !imgFile}
          >
            Recognize Face
          </Button>
        </Box>
        
        {recognitionResult && (
          <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recognition Results:
            </Typography>
            
            {recognitionResult.matches && recognitionResult.matches.length > 0 ? (
              <>
                <Alert severity="success" sx={{ mb: 2 }}>
                  {recognitionResult.message}
                </Alert>
                <List>
                  {recognitionResult.matches.map((match) => (
                    <React.Fragment key={match.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={match.name} secondary={`User ID: ${match.id}`} />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </>
            ) : (
              <Alert 
                severity="info" 
                icon={<HelpIcon />}
                sx={{ mt: 2 }}
              >
                {recognitionResult.message}
              </Alert>
            )}
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default RecognizePage;

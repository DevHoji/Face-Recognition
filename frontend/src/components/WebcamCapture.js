import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button, Box, CircularProgress, Alert, Paper } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ReplayIcon from '@mui/icons-material/Replay';

const WebcamCapture = ({ onCapture, isLoading, error }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    
    // Convert base64 to blob for API upload
    if (imageSrc) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          onCapture(blob);
        });
    }
  }, [webcamRef, onCapture]);

  const retake = () => {
    setImgSrc(null);
  };

  const videoConstraints = {
    width: 480,
    height: 360,
    facingMode: "user"
  };

  return (
    <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {imgSrc ? (
        <Box sx={{ position: 'relative', width: 480, height: 360 }}>
          <img src={imgSrc} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {isLoading && (
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
        </Box>
      ) : (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          width={480}
          height={360}
        />
      )}
      
      {error && (
        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        {imgSrc ? (
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={retake}
            startIcon={<ReplayIcon />}
            disabled={isLoading}
          >
            Retake Photo
          </Button>
        ) : (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={capture}
            startIcon={<CameraAltIcon />}
          >
            Capture Photo
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default WebcamCapture;

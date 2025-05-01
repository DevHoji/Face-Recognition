import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Paper,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";
import { CameraAlt as Camera } from "@mui/icons-material";
import { RefreshCcw } from "lucide-react";

const WebcamCapture = ({ onCapture, isLoading, error }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const webcamRef = useRef(null);
  const theme = useTheme();

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc);

    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => onCapture(blob));
    }
  };

  const retake = () => setImgSrc(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={4}
        sx={{
          overflow: "hidden",
          borderRadius: 2,
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: theme.palette.grey[100],
            }}
          >
            {imgSrc ? (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={imgSrc}
                alt="Captured"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            )}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: 8,
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <CircularProgress color="primary" size={60} />
                </motion.div>
              </motion.div>
            )}
          </Box>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: 16 }}
            >
              <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
                {error}
              </Alert>
            </motion.div>
          )}

          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: "inline-block" }}
            >
              <Button
                variant="contained"
                onClick={imgSrc ? retake : capture}
                disabled={isLoading}
                startIcon={imgSrc ? <RefreshCcw size={20} /> : <Camera />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: "50px",
                  background: imgSrc
                    ? theme.palette.secondary.main
                    : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  "&:hover": {
                    background: imgSrc
                      ? theme.palette.secondary.dark
                      : `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  },
                  "&:disabled": {
                    background: theme.palette.action.disabledBackground,
                  },
                  textTransform: "none",
                  fontWeight: 500,
                  minWidth: 200,
                }}
              >
                {imgSrc ? "Retake Photo" : "Capture Photo"}
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default WebcamCapture;

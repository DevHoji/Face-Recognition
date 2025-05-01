import React, { useState, useEffect } from "react";
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
  CircularProgress,
  useTheme,
  alpha,
  ThemeProvider,
  createTheme,
  Fade,
  Grow,
  Zoom,
} from "@mui/material";
import WebcamCapture from "../components/WebcamCapture";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HelpIcon from "@mui/icons-material/Help";
import FaceIcon from "@mui/icons-material/Face";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { motion } from "framer-motion";

// Custom theme
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#3a7bd5",
      light: "#5d99e7",
      dark: "#2d62b3",
    },
    secondary: {
      main: "#00d2ff",
      light: "#6adfff",
      dark: "#00a0c2",
    },
    background: {
      default: "#f7f9fc",
      paper: "#ffffff",
    },
    text: {
      primary: "#2c3e50",
      secondary: "#546e7a",
    },
    error: {
      main: "#e74c3c",
    },
    success: {
      main: "#2ecc71",
    },
    info: {
      main: "#3498db",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          },
        },
        contained: {
          boxShadow: "0 3px 10px rgba(58, 123, 213, 0.2)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: "0.95rem",
        },
      },
    },
  },
});

const RecognizePage = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [imgFile, setImgFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const handleCapture = (blob) => {
    setImgFile(blob);
    setError("");
    setRecognitionResult(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgFile(file);
      setUploadedImageUrl(URL.createObjectURL(file));
      setError("");
      setRecognitionResult(null);
    }
  };

  const handleRecognize = async () => {
    if (!imgFile) {
      setError("Please capture or upload an image first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create form data
      const formData = new FormData();
      formData.append("image", imgFile, "face.jpg");

      // Send recognition request
      const response = await axios.post("/users/recognize", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Recognition result:", response.data);
      setRecognitionResult(response.data);
    } catch (err) {
      console.error("Recognition error:", err);
      setError(
        err.response?.data?.detail ||
          "Failed to recognize face. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setImgFile(null);
    setUploadedImageUrl("");
    setRecognitionResult(null);
    setError("");
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container
        maxWidth="md"
        sx={{
          py: 5,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Fade in={pageLoaded} timeout={800}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: "16px",
              background: `linear-gradient(145deg, ${alpha(
                theme.palette.background.paper,
                0.95
              )}, ${theme.palette.background.paper})`,
              backdropFilter: "blur(10px)",
              overflow: "hidden",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Zoom in={pageLoaded} style={{ transitionDelay: "200ms" }}>
                <Avatar
                  sx={{
                    mr: 2,
                    bgcolor: "primary.main",
                    width: 48,
                    height: 48,
                    boxShadow: "0 4px 12px rgba(58, 123, 213, 0.2)",
                  }}
                >
                  <FaceIcon fontSize="large" />
                </Avatar>
              </Zoom>
              <Zoom in={pageLoaded} style={{ transitionDelay: "400ms" }}>
                <Typography
                  variant="h4"
                  component="h1"
                  color="text.primary"
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Face Recognition
                </Typography>
              </Zoom>
            </Box>

            <Fade in={pageLoaded} style={{ transitionDelay: "600ms" }}>
              <Box
                sx={{
                  borderRadius: "12px",
                  mb: 4,
                  overflow: "hidden",
                  boxShadow: `0 2px 8px ${alpha(
                    theme.palette.primary.main,
                    0.1
                  )}`,
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{
                    "& .MuiTabs-indicator": {
                      height: 3,
                      borderRadius: "3px 3px 0 0",
                    },
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  }}
                >
                  <Tab
                    icon={<CameraAltIcon />}
                    label="Webcam"
                    iconPosition="start"
                    sx={{ py: 2 }}
                  />
                  <Tab
                    icon={<CloudUploadIcon />}
                    label="Upload Image"
                    iconPosition="start"
                    sx={{ py: 2 }}
                  />
                </Tabs>
              </Box>
            </Fade>

            <Box sx={{ minHeight: "350px" }}>
              {tabValue === 0 && (
                <Grow in={tabValue === 0} timeout={600}>
                  <Box sx={{ mb: 4 }}>
                    <WebcamCapture
                      onCapture={handleCapture}
                      isLoading={loading}
                      error={error}
                    />
                  </Box>
                </Grow>
              )}

              {tabValue === 1 && (
                <Grow in={tabValue === 1} timeout={600}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mb: 4,
                    }}
                  >
                    <input
                      accept="image/*"
                      id="upload-image-file"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                      disabled={loading}
                    />
                    <label htmlFor="upload-image-file">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        disabled={loading}
                        size="large"
                        sx={{
                          py: 1.5,
                          px: 4,
                          borderRadius: "10px",
                          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        Upload Image
                      </Button>
                    </label>

                    {uploadedImageUrl && (
                      <Fade in={!!uploadedImageUrl} timeout={800}>
                        <Paper
                          elevation={2}
                          sx={{
                            mt: 4,
                            p: 1,
                            position: "relative",
                            borderRadius: "12px",
                            overflow: "hidden",
                            width: "100%",
                            maxWidth: "450px",
                          }}
                        >
                          <Box
                            component={motion.div}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={uploadedImageUrl}
                              alt="Uploaded"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "350px",
                                display: "block",
                                borderRadius: "8px",
                              }}
                            />
                          </Box>
                          {loading && (
                            <Fade in={loading} timeout={300}>
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundColor: alpha(
                                    theme.palette.background.paper,
                                    0.7
                                  ),
                                  backdropFilter: "blur(4px)",
                                  borderRadius: "12px",
                                }}
                              >
                                <CircularProgress
                                  size={60}
                                  thickness={4}
                                  sx={{
                                    color: theme.palette.primary.main,
                                    "& .MuiCircularProgress-circle": {
                                      strokeLinecap: "round",
                                    },
                                  }}
                                />
                              </Box>
                            </Fade>
                          )}
                        </Paper>
                      </Fade>
                    )}
                  </Box>
                </Grow>
              )}
            </Box>

            {error && (
              <Grow in={!!error} timeout={500}>
                <Alert
                  severity="error"
                  variant="filled"
                  sx={{
                    mt: 2,
                    mb: 3,
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(231, 76, 60, 0.15)",
                  }}
                >
                  {error}
                </Alert>
              </Grow>
            )}

            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleRecognize}
                disabled={loading || !imgFile}
                startIcon={<FaceIcon />}
                sx={{
                  py: 1.5,
                  px: 5,
                  borderRadius: "12px",
                  letterSpacing: "0.5px",
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                    transform: "translateX(-100%)",
                  },
                  "&:hover::before": {
                    transform: "translateX(100%)",
                    transition: "transform 0.8s ease",
                  },
                  "&:disabled": {
                    background: theme.palette.action.disabledBackground,
                  },
                }}
              >
                {loading ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircularProgress
                      size={24}
                      color="inherit"
                      sx={{ mr: 1 }}
                    />
                    Processing...
                  </Box>
                ) : (
                  "Recognize Face"
                )}
              </Button>
            </Box>

            {recognitionResult && (
              <Grow
                in={!!recognitionResult}
                timeout={800}
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    mt: 5,
                    p: 3,
                    borderRadius: "14px",
                    background: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${alpha(
                      theme.palette.primary.main,
                      0.1
                    )}`,
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: theme.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    <FaceIcon
                      sx={{ mr: 1, color: theme.palette.primary.main }}
                    />
                    Recognition Results
                  </Typography>

                  {recognitionResult.matches &&
                  recognitionResult.matches.length > 0 ? (
                    <>
                      <Fade in={true} timeout={500}>
                        <Alert
                          severity="success"
                          variant="filled"
                          sx={{
                            mb: 3,
                            borderRadius: "10px",
                            boxShadow: "0 4px 12px rgba(46, 204, 113, 0.15)",
                          }}
                        >
                          {recognitionResult.message}
                        </Alert>
                      </Fade>
                      <List
                        sx={{
                          bgcolor: alpha(theme.palette.background.paper, 0.5),
                          borderRadius: "10px",
                          overflow: "hidden",
                          border: `1px solid ${alpha(
                            theme.palette.divider,
                            0.1
                          )}`,
                        }}
                      >
                        {recognitionResult.matches.map((match, index) => (
                          <Fade
                            key={match.id}
                            in={true}
                            timeout={300 + index * 200}
                          >
                            <React.Fragment>
                              <ListItem
                                sx={{
                                  py: 1.5,
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    bgcolor: alpha(
                                      theme.palette.primary.light,
                                      0.1
                                    ),
                                  },
                                }}
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    sx={{
                                      bgcolor: theme.palette.primary.main,
                                      boxShadow: `0 2px 8px ${alpha(
                                        theme.palette.primary.main,
                                        0.3
                                      )}`,
                                      transition: "all 0.3s ease",
                                      "&:hover": {
                                        transform: "scale(1.1)",
                                      },
                                    }}
                                  >
                                    <PersonIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontWeight: 600,
                                        color: theme.palette.text.primary,
                                      }}
                                    >
                                      {match.name}
                                    </Typography>
                                  }
                                  secondary={
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: theme.palette.text.secondary,
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      User ID: {match.id}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                              {index < recognitionResult.matches.length - 1 && (
                                <Divider variant="inset" component="li" />
                              )}
                            </React.Fragment>
                          </Fade>
                        ))}
                      </List>
                    </>
                  ) : (
                    <Fade in={true} timeout={600}>
                      <Alert
                        severity="info"
                        variant="filled"
                        icon={<HelpIcon />}
                        sx={{
                          mt: 2,
                          borderRadius: "10px",
                          boxShadow: `0 4px 12px ${alpha(
                            theme.palette.info.main,
                            0.15
                          )}`,
                        }}
                      >
                        {recognitionResult.message}
                      </Alert>
                    </Fade>
                  )}
                </Paper>
              </Grow>
            )}
          </Paper>
        </Fade>
      </Container>
    </ThemeProvider>
  );
};

export default RecognizePage;

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Snackbar,
  Paper,
  Avatar,
  ThemeProvider,
  createTheme,
  alpha,
  CircularProgress,
  Fade,
  Grow,
  Zoom,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import WebcamCapture from "../components/WebcamCapture";
import axios from "axios";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BadgeIcon from "@mui/icons-material/Badge";
import FaceIcon from "@mui/icons-material/Face";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

// Custom theme
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#4361ee",
      light: "#758bff",
      dark: "#2742b9",
    },
    secondary: {
      main: "#3bc1ff",
      light: "#7dd4ff",
      dark: "#0095d6",
    },
    background: {
      default: "#f8faff",
      paper: "#ffffff",
    },
    text: {
      primary: "#2d3748",
      secondary: "#4a5568",
    },
    error: {
      main: "#e53e3e",
    },
    success: {
      main: "#38b2ac",
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
      letterSpacing: "0.01em",
      color: "#4a5568",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.02em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "12px 24px",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 8px 20px rgba(67, 97, 238, 0.2)",
          },
        },
        containedPrimary: {
          boxShadow: "0 4px 14px rgba(67, 97, 238, 0.3)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              boxShadow: "0 3px 10px rgba(67, 97, 238, 0.1)",
            },
            "&.Mui-focused": {
              transform: "translateY(-2px)",
              boxShadow: "0 5px 15px rgba(67, 97, 238, 0.15)",
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        filledSuccess: {
          boxShadow: "0 4px 12px rgba(56, 178, 172, 0.2)",
        },
        filledError: {
          boxShadow: "0 4px 12px rgba(229, 62, 62, 0.2)",
        },
      },
    },
  },
});

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const isSmallScreen = useMediaQuery(customTheme.breakpoints.down("sm"));

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (error) setError("");
  };

  const handleCapture = (blob) => {
    setImgFile(blob);
    setError("");
  };

  const handleRegister = async () => {
    // Validate inputs
    if (!name.trim()) {
      setError("Please enter a name");
      return;
    }

    if (!imgFile) {
      setError("Please capture a photo");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create form data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", imgFile, "face.jpg");

      // Send registration request
      const response = await axios.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Registration successful:", response.data);
      setSuccess(true);

      // Reset form
      setName("");
      setImgFile(null);
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.detail ||
          "Failed to register user. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
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
              borderRadius: "20px",
              background: `linear-gradient(145deg, ${alpha(
                customTheme.palette.background.paper,
                0.95
              )}, ${customTheme.palette.background.paper})`,
              backdropFilter: "blur(10px)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "6px",
                background: `linear-gradient(90deg, ${customTheme.palette.primary.main}, ${customTheme.palette.secondary.main})`,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 4,
                flexDirection: isSmallScreen ? "column" : "row",
                gap: isSmallScreen ? 2 : 0,
              }}
            >
              <Zoom in={pageLoaded} style={{ transitionDelay: "200ms" }}>
                <Avatar
                  sx={{
                    mr: isSmallScreen ? 0 : 2,
                    bgcolor: "primary.main",
                    width: 56,
                    height: 56,
                    boxShadow: "0 6px 16px rgba(67, 97, 238, 0.25)",
                  }}
                >
                  <PersonAddIcon sx={{ fontSize: 32 }} />
                </Avatar>
              </Zoom>
              <Zoom in={pageLoaded} style={{ transitionDelay: "400ms" }}>
                <Typography
                  variant="h4"
                  component="h1"
                  textAlign={isSmallScreen ? "center" : "left"}
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(90deg, ${customTheme.palette.primary.main}, ${customTheme.palette.secondary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Register New User
                </Typography>
              </Zoom>
            </Box>

            <Fade in={pageLoaded} style={{ transitionDelay: "600ms" }}>
              <Box sx={{ mt: 2, mb: 4 }}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                    disabled={loading}
                    sx={{
                      mb: 4,
                      "& .MuiInputLabel-root": {
                        fontSize: "0.95rem",
                        fontWeight: 500,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    autoFocus
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      mt: 2,
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontWeight: 600,
                    }}
                  >
                    <FaceIcon color="primary" />
                    Capture Face Image
                  </Typography>

                  <Box
                    sx={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: `1px solid ${alpha(
                        customTheme.palette.primary.main,
                        0.1
                      )}`,
                      boxShadow: `0 8px 24px ${alpha(
                        customTheme.palette.primary.main,
                        0.08
                      )}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: `0 12px 28px ${alpha(
                          customTheme.palette.primary.main,
                          0.12
                        )}`,
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    <WebcamCapture
                      onCapture={handleCapture}
                      isLoading={loading}
                      error={error}
                    />
                  </Box>
                </motion.div>
              </Box>
            </Fade>

            {error && (
              <Grow in={!!error} timeout={500}>
                <Alert
                  severity="error"
                  variant="filled"
                  icon={
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      ⚠️
                    </motion.div>
                  }
                  sx={{
                    mt: 3,
                    mb: 3,
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(229, 62, 62, 0.15)",
                    fontSize: "0.95rem",
                  }}
                >
                  {error}
                </Alert>
              </Grow>
            )}

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleRegister}
                disabled={loading || !imgFile || !name.trim()}
                startIcon={loading ? undefined : <PersonAddIcon />}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: "14px",
                  letterSpacing: "0.5px",
                  fontSize: "1rem",
                  background: `linear-gradient(45deg, ${customTheme.palette.primary.dark}, ${customTheme.palette.primary.main}, ${customTheme.palette.secondary.main})`,
                  backgroundSize: "200% auto",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    backgroundPosition: "right center",
                    boxShadow: `0 8px 25px ${alpha(
                      customTheme.palette.primary.main,
                      0.35
                    )}`,
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: "-50%",
                    left: "-50%",
                    width: "200%",
                    height: "200%",
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
                    opacity: 0,
                    transition: "opacity 0.5s ease",
                    transformOrigin: "center",
                    pointerEvents: "none",
                  },
                  "&:hover::after": {
                    opacity: 1,
                  },
                  "&:disabled": {
                    background: alpha(customTheme.palette.action.disabled, 0.7),
                  },
                }}
              >
                {loading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <CircularProgress size={24} color="inherit" />
                    Processing...
                  </Box>
                ) : (
                  "Register User"
                )}
              </Button>
            </Box>

            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: pageLoaded ? 0.6 : 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              sx={{
                position: "absolute",
                top: -100,
                right: -100,
                width: 350,
                height: 350,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${alpha(
                  customTheme.palette.primary.light,
                  0.2
                )} 0%, ${alpha(customTheme.palette.primary.light, 0)} 70%)`,
                zIndex: 0,
                pointerEvents: "none",
              }}
            />

            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: pageLoaded ? 0.5 : 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              sx={{
                position: "absolute",
                bottom: -80,
                left: -80,
                width: 250,
                height: 250,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${alpha(
                  customTheme.palette.secondary.light,
                  0.15
                )} 0%, ${alpha(customTheme.palette.secondary.light, 0)} 70%)`,
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
          </Paper>
        </Fade>
      </Container>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Grow}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          icon={<CheckCircleIcon />}
          sx={{
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(56, 178, 172, 0.3)",
            display: "flex",
            alignItems: "center",
            "& .MuiAlert-icon": {
              fontSize: "1.5rem",
              mr: 1,
              opacity: 1,
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, letterSpacing: "0.01em" }}
            >
              User registered successfully!
            </Typography>
          </motion.div>
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default RegisterPage;

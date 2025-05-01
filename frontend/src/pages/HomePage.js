import React from "react";
import { motion } from "framer-motion";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import {
  PersonAdd,
  FaceRetouchingNatural,
  People,
  ArrowForward,
} from "@mui/icons-material";

const HomePage = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <PersonAdd sx={{ fontSize: 48 }} />,
      title: "Register Face",
      description:
        "Add a new user to the system by capturing their face and saving their information to the database.",
      path: "/register",
    },
    {
      icon: <FaceRetouchingNatural sx={{ fontSize: 48 }} />,
      title: "Recognize Face",
      description:
        "Identify a person by capturing their face with the webcam or uploading an image containing a face.",
      path: "/recognize",
    },
    {
      icon: <People sx={{ fontSize: 48 }} />,
      title: "View Users",
      description:
        "See a list of all registered users in the system and manage user entries in the database.",
      path: "/users",
    },
  ];

  const MotionContainer = motion(Container);
  const MotionCard = motion(Card);

  return (
    <Box
      sx={{
        minHeight: "90vh",
        background: `linear-gradient(180deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[100]} 100%)`,
        py: 8,
      }}
    >
      <MotionContainer
        maxWidth="lg"
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                mb: 3,
              }}
            >
              Face Recognition System
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ maxWidth: "800px", mx: "auto" }}
            >
              A powerful application to register and recognize faces using
              computer vision
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 1) }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: theme.shadows[8],
                }}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 2,
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 4 }}>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Box
                      sx={{
                        color: theme.palette.primary.main,
                        mb: 3,
                      }}
                    >
                      {feature.icon}
                    </Box>
                  </motion.div>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 4 }}>
                    {feature.description}
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    href={feature.path}
                    endIcon={<ArrowForward />}
                    sx={{
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      borderRadius: "50px",
                      px: 4,
                      "&:hover": {
                        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      },
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </MotionContainer>
    </Box>
  );
};

export default HomePage;

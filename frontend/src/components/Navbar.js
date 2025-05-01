import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Face,
  Home,
  PersonAdd,
  Face6,
  Group,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Register", icon: <PersonAdd />, path: "/register" },
    { text: "Recognize", icon: <Face6 />, path: "/recognize" },
    { text: "Users", icon: <Group />, path: "/users" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const MotionBox = motion(Box);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(45deg, #6366F1 30%, #4F46E5 90%)",
          boxShadow: "0 3px 5px 2px rgba(99, 102, 241, .3)",
        }}
      >
        <Toolbar>
          <MotionBox
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
          >
            <Face sx={{ fontSize: 32, mr: 2 }} />
            <Typography variant="h6" component="div">
              Face Recognition App
            </Typography>
          </MotionBox>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              {navItems.map((item, index) => (
                <MotionBox
                  key={item.text}
                  component={motion.div}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    color="inherit"
                    href={item.path}
                    startIcon={item.icon}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                </MotionBox>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            background: "linear-gradient(45deg, #6366F1 30%, #4F46E5 90%)",
            color: "white",
          },
        }}
      >
        <List>
          {navItems.map((item, index) => (
            <MotionBox
              key={item.text}
              component={motion.div}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <ListItem
                button
                component="a"
                href={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </MotionBox>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;

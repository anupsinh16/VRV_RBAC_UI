import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: { xs: 1, sm: 2 }, 
        }}
      >
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap", 
          }}
        >
          <Typography variant="body1">Welcome, Admin</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;


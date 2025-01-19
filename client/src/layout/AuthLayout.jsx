import { useSelector } from "react-redux";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";
import CustomLogo from "../components/CustomLogo";

const AuthLayout = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    setMenuAnchor(null);
    console.log("Logout");
  };

  return (
    <Box width="100%" height="100%" sx={{ pt: 8 }}>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          width: "100%",
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          maxWidth: { sm: "100%", md: "1700px" },
          p: 1.5,
          px: { md: 4 },
          position: "fixed",
          top: 0,
          backgroundColor: "background.default",
          zIndex: 1,
          boxShadow:
            "0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          onClick={() => navigate(currentUser ? "/dashboard" : "/")}
          sx={{ cursor: "pointer" }}
        >
          <CustomLogo />
          <Typography
            variant="h4"
            component="h1"
            sx={{ color: "text.primary" }}
          >
            Taskmanager
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <ColorModeIconDropdown />
          <IconButton size="small" onClick={handleMenuOpen}>
            <ListIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            {currentUser ? (
              <MenuItem onClick={handleLogout}>
                <LogoutIcon /> Logout
              </MenuItem>
            ) : (
              <>
                <MenuItem onClick={() => navigate("/login")}>
                  <LoginIcon /> Login
                </MenuItem>
                <MenuItem onClick={() => navigate("/register")}>
                  <AccountCircleIcon /> Register
                </MenuItem>
              </>
            )}
          </Menu>
        </Stack>
      </Stack>
      <Box width="100%" height="100%" sx={{ px: { md: 4 }, overflow: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;

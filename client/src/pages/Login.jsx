import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { setCurrentUser } from "../redux/features/auth/authSlice";

import Content from "../components/Content";
import AuthCard from "../components/AuthCard";
import MuiTextField from "../components/MuiTextField";
import { SitemarkIcon } from "../components/CustomIcons";

import { makeRequest } from "../api/apiRequest";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control, reset, watch, setValue } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      const response = await makeRequest.post("/auth/login", data);
      dispatch(setCurrentUser(response.data));
      toast.success(response.data.message);
      reset();
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <Content />
      <AuthCard>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <SitemarkIcon />
        </Box>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Log in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <MuiTextField
              name="email"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              control={control}
              rules={{ required: "Email is required" }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <MuiTextField
              name="password"
              placeholder="••••••"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              control={control}
              rules={{ required: "Password is required" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      size="small"
                      edge="end"
                      sx={{ border: "none" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                id="remember"
                name="remember"
                value="remember"
                color="primary"
                checked={watch("rememberMe")}
                onChange={(e) => setValue("rememberMe", e.target.checked)}
              />
            }
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained">
            Log in
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <span>
              <Link
                component={Link}
                to={{
                  pathname: "/signup",
                  state: { from: "/login" },
                }}
                style={{
                  alignSelf: "center",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Sign up
              </Link>
            </span>
          </Typography>
        </Box>
      </AuthCard>
    </React.Fragment>
  );
};

export default Login;

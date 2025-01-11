import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { makeRequest } from "../api/apiRequest";

const VerifyEmail = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isCalled = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleVerifyEmail = async () => {
      if (isCalled.current) return; // Prevent duplicate requests
      isCalled.current = true;

      setLoading(true);
      try {
        const response = await makeRequest.get(`/auth/verify/${token}`);
        toast.success(response.data.message);
        navigate("/dashboard", { replace: true });
      } catch (err) {
        const errorMessage = err.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    handleVerifyEmail();
  }, [token, navigate]);

  return (
    <>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={50} />
        </Box>
      )}

      {error && (
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
            px: 2,
          }}
        >
          <Typography variant="h6" color="error" gutterBottom>
            {error}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/signup", { replace: true })}
            sx={{ mt: 2 }}
          >
            Go to Sign Up
          </Button>
        </Box>
      )}
    </>
  );
};

export default VerifyEmail;

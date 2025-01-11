import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router";
import ColorModeSelect from "../shared-theme/ColorModeSelect";

const AuthContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  overflow: "auto",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const AuthLayout = () => {
  return (
    <AuthContainer direction="column" sx={{ justifyContent: { lg: "center" } }}>
      <ColorModeSelect
        sx={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 1 }}
      />
      <Stack
        direction={{ xs: "column-reverse", md: "row" }}
        sx={{
          justifyContent: "center",
          gap: { xs: 6, sm: 12 },
          py: 2,
          mx: "auto",
        }}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            gap: { xs: 3, sm: 6 },
            py: { xs: 4, sm: 0 },
            m: "auto",
          }}
        >
          <Outlet />
        </Stack>
      </Stack>
    </AuthContainer>
  );
};

export default AuthLayout;

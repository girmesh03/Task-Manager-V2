import { Outlet } from "react-router";
import { Box, Stack } from "@mui/material";

import ColorModeSelect from "../shared-theme/ColorModeSelect";

const AuthLayout = () => {
  return (
    <Box
      width="100%"
      sx={{
        height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
        overflow: "hidden",
      }}
    >
      <ColorModeSelect
        sx={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 1 }}
      />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            height: "100%",
            overflow: "auto",
            p: 1,
          },
          (theme) => ({
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
          }),
        ]}
      >
        <Outlet />
      </Stack>
    </Box>
  );
};

export default AuthLayout;

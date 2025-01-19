import { Outlet } from "react-router";
import CssBaseline from "@mui/material/CssBaseline";

import AppTheme from "../shared-theme/AppTheme";

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../theme/customizations";
import { Box } from "@mui/material";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

const RootLayout = (props) => {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box
        sx={(theme) => ({
          width: "100%",
          maxWidth: { sm: "100%", md: "1700px" },
          margin: "0 auto",
          height: "100dvh",
          overflow: "hidden",
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
        })}
      >
        <Outlet />
      </Box>
    </AppTheme>
  );
};

export default RootLayout;

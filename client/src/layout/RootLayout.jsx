import { Outlet } from "react-router";
import CssBaseline from "@mui/material/CssBaseline";

import AppTheme from "../shared-theme/AppTheme";

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../theme/customizations";

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
      <Outlet />
    </AppTheme>
  );
};

export default RootLayout;

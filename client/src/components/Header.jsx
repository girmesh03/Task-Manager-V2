import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";
import CustomDatePicker from "./CustomDatePicker";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import MenuButton from "./MenuButton";
import Search from "./Search";

const Header = ({ setSearchText, setSelectedDate }) => {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search setSearchText={setSearchText} />
        <CustomDatePicker setSelectedDate={setSelectedDate} />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
};

Header.propTypes = {
  setSearchText: PropTypes.func.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
};

export default Header;

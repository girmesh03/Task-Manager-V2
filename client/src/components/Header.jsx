import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";
import CustomDatePicker from "./CustomDatePicker";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import MenuButton from "./MenuButton";
import Search from "./Search";

const Header = ({ setSearchText, selectedDate, setSelectedDate }) => {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        p: 1.5,
        position: "sticky",
        top: 0,
        backgroundColor: "background.default",
        zIndex: 1,
        boxShadow:
          "0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search setSearchText={setSearchText} />
        <CustomDatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
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
  selectedDate: PropTypes.string,
  setSelectedDate: PropTypes.func.isRequired,
};

export default Header;

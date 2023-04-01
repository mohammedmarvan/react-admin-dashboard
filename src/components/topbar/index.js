import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
// import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
// import SearchIcon from "@mui/icons-material/Search";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { signOut } from "next-auth/react";

const Topbar = () => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [personalSettingEl, setPersonalSettingEl] = useState(null);
  const open = Boolean(personalSettingEl);

  const handlePersonalMenuClick = (e) => {
      setPersonalSettingEl(e.currentTarget);
  }

  const handlePersonalMenuClickClose = () => {
    setPersonalSettingEl(null);
  }

  const handleLogoutClick = () => {
    handlePersonalMenuClickClose();
    signOut();
  }

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton
          aria-controls="personal-menu"
          aria-haspopup="true"
          onClick={handlePersonalMenuClick}
          // aria-label="Open personal menu"
          // title="Open personal menu"
        >
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          id="personal-menu"
          anchorEl={personalSettingEl}
          open={open}
          onClose={handlePersonalMenuClickClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem 
            onClick={handleLogoutClick}
          >
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="medium" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;

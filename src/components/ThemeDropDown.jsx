import React from "react";
import { IconButton } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';

const ThemeDropDown = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        color: theme === "dark" ? "white" : "black",
      }}>
      {theme === "dark" ? <LightModeIcon /> : <DarkModeRoundedIcon />}
    </IconButton>
  );
};

export default ThemeDropDown;

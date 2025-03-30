import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function ThemeToggle({ toggleTheme }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Tooltip title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
      <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;
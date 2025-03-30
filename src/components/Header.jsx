import React from 'react';
import { Typography, Box, Paper, useTheme } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

// App header with title and gradient background
// Changes colors based on dark/light mode
function Header() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        textAlign: 'center', 
        py: 4, 
        px: 2, 
        mb: 4, 
        background: isDark 
          ? 'linear-gradient(45deg, #2c387e 30%, #3949ab 90%)' 
          : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
          <TaskAltIcon sx={{ fontSize: 40, mr: 1 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Task Manager
          </Typography>
        </Box>
        <Typography variant="subtitle1">
          Organize, prioritize, and complete your tasks efficiently
        </Typography>
      </Box>
      
      <Box sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        opacity: 0.1,
        background: 'repeating-linear-gradient(45deg, #ffffff, #ffffff 10px, transparent 10px, transparent 20px)',
      }} />
    </Paper>
  );
}

export default Header;
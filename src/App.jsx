import React, { useState, useMemo } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Container, 
  Box 
} from '@mui/material';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterControls from './components/FilterControls';
import ThemeToggle from './components/ThemeToggle';
import Notifications from './components/Notifications';
import './App.css';

function App() {
  // Get the user's preferred theme from localStorage or default to light
  // This helps persist user preference between visits!
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('theme-mode');
    return savedMode || 'light';
  });
  
  // Create a theme with light/dark mode
    const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
                    primary: {
            main: mode === 'dark' ? '#90caf9' : '#1976d2',
          },
          secondary: {
            main: mode === 'dark' ? '#f48fb1' : '#f50057',
          },
          background: {
            default: mode === 'dark' ? '#121212' : '#f5f7fa',
            paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          },
        },
                typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h4: {
            fontWeight: 600,
          },
        },
                components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: 'none',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  };

  return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh', 
          bgcolor: 'background.default', 
          py: 3,
          transition: 'background-color 0.5s ease'
        }}>
          <Container maxWidth="lg">
            <Box sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16 
            }}>
              <ThemeToggle toggleTheme={toggleTheme} />
            </Box>
            <Header />
            <TaskForm />
            <FilterControls />
            <TaskList />
          </Container>
        </Box>
        <Notifications />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
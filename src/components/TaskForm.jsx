import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Paper, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-hot-toast';

// This component handles creating new tasks with title and priority
function TaskForm() {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    
    // Validation - don't allow empty task titles
    if (!trimmedTitle) {
      toast.error('Task description cannot be empty');
      return;
    }

    dispatch(addTask({
      id: Date.now(),
      title: trimmedTitle,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    }));
    setTitle('');
    setPriority('medium');
  };

  // Helper function to get the appropriate icon for each priority level
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <PriorityHighIcon fontSize="small" sx={{ color: theme.palette.error.main }} />;
      case 'medium':
        return <RemoveIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />;
      case 'low':
        return <ArrowDownwardIcon fontSize="small" sx={{ color: theme.palette.success.main }} />;
      default:
        return null;
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ 
        display: 'flex', 
        gap: 2,
        // Responsive layout - stack vertically on mobile, horizontal on desktop
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'flex-start' },
      }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Task Description"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          size="small"
          autoFocus
        />
        <FormControl sx={{ 
          minWidth: { xs: '100%', md: 180 }, 
          flexShrink: 0
        }} size="small">
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getPriorityIcon(selected)}
                {selected.charAt(0).toUpperCase() + selected.slice(1)}
              </Box>
            )}
          >
            <MenuItem value="high">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PriorityHighIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
                High
              </Box>
            </MenuItem>
            <MenuItem value="medium">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <RemoveIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />
                Medium
              </Box>
            </MenuItem>
            <MenuItem value="low">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ArrowDownwardIcon fontSize="small" sx={{ color: theme.palette.success.main }} />
                Low
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          startIcon={<AddIcon />}
          size="medium"
          sx={{ 
            minWidth: { xs: '100%', md: 130 },
            height: 40,
            whiteSpace: 'nowrap',
            alignSelf: { xs: 'stretch', md: 'center' } 
          }}
        >
          Add Task
        </Button>
      </Box>
    </Paper>
  );
}

export default TaskForm;
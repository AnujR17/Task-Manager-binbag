import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../redux/tasksSlice';
import { Card, CardContent, TextField, Select, MenuItem, FormControl, InputLabel, Button, Box, Checkbox, Typography, IconButton, Chip, Collapse, Stack, Paper, Tooltip, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RemoveIcon from '@mui/icons-material/Remove';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteConfirmDialog from './DeleteConfirmDialog';

function TaskItem({ task }) {
  // State for toggling between view and edit modes
  const [isEditing, setIsEditing] = useState(false);
  // Track edited values separately to avoid immediate UI updates
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  // Save changes to Redux store when user confirms edits
  const handleUpdate = () => {
    if (editTitle.trim()) {
      dispatch(updateTask({
        ...task,
        title: editTitle.trim(),
        priority: editPriority
      }));
      setIsEditing(false);
    }
  };

  // Quick toggle for task completion status
  // Preserves all other task properties when updating
  const toggleComplete = () => {
    dispatch(updateTask({
      ...task,
      completed: !task.completed
    }));
  };

  // Helper function to get priority visualization info
  // Returns color, label and icon based on priority level
  const getPriorityInfo = () => {
    switch (task.priority) {
      case 'high':
        return { 
          color: theme.palette.error.main, 
          label: 'High', 
          icon: <PriorityHighIcon fontSize="small" />
        };
      case 'medium':
        return {
          color: theme.palette.warning.main,
          label: 'Medium',
          icon: <RemoveIcon fontSize="small" />
        };
      case 'low':
        return {
          color: theme.palette.success.main,
          label: 'Low',
          icon: <ArrowDownwardIcon fontSize="small" />
        };
      default:
        return { color: '#ccc', label: 'Unknown', icon: null };
    }
  };

  const priorityInfo = getPriorityInfo();
  
  // Format creation date to be more human-readable
  // yyyy-mm-dd is not as nice as "Jan 15, 2023"
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Avoid accidental deletions by showing confirmation dialog
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    dispatch(deleteTask(task.id));
    setDeleteDialogOpen(false);
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        mb: 2, 
        // Color-coded left border based on priority - visual indicator FTW!
        borderLeft: `4px solid ${task.completed ? theme.palette.grey[500] : priorityInfo.color}`,
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)',
        },
        opacity: task.completed ? 0.8 : 1
      }}
    >
      <CardContent sx={{ p: '16px !important' }}>
        {/* EDIT MODE: Show form when editing */}
        <Collapse in={isEditing} timeout="auto">
          <Box sx={{ mb: isEditing ? 2 : 0 }}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Task Description"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                size="small"
                autoFocus
              />
              <FormControl fullWidth size="small">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={editPriority}
                  label="Priority"
                  onChange={(e) => setEditPriority(e.target.value)}
                >
                  <MenuItem value="low">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ArrowDownwardIcon fontSize="small" sx={{ color: theme.palette.success.main }} />
                      Low
                    </Box>
                  </MenuItem>
                  <MenuItem value="medium">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <RemoveIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />
                      Medium
                    </Box>
                  </MenuItem>
                  <MenuItem value="high">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PriorityHighIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
                      High
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button 
                  variant="outlined" 
                  onClick={() => setIsEditing(false)}
                  startIcon={<CancelIcon />}
                  size="small"
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  onClick={handleUpdate}
                  startIcon={<SaveIcon />}
                  size="small"
                >
                  Save
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Collapse>

        {/* VIEW MODE: Show task details when not editing */}
        <Collapse in={!isEditing} timeout="auto">
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            justifyContent: 'space-between',
            gap: 1
          }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexGrow: 1 }}>
              <Tooltip title="Drag to reorder">
                {/* Drag handle - user can grab this to reorder tasks */}
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%', 
                  pr: 1,
                  color: theme.palette.text.disabled,
                  cursor: 'grab',
                  '&:active': { cursor: 'grabbing' }
                }}>
                  <DragHandleIcon />
                </Box>
              </Tooltip>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Checkbox
                  checked={task.completed}
                  onChange={toggleComplete}
                  sx={{ pt: 0 }}
                />
                <Box>
                  <Typography 
                    sx={{ 
                      // Visually indicate completion status with strikethrough
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? theme.palette.text.secondary : theme.palette.text.primary,
                      fontWeight: 500,
                      wordBreak: 'break-word' // Prevents overflow for long task titles
                    }}
                  >
                    {task.title}
                  </Typography>
                  {/* Task metadata section */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, flexWrap: 'wrap', gap: 1 }}>
                    <Chip 
                      icon={priorityInfo.icon}
                      label={priorityInfo.label}
                      size="small"
                      sx={{ 
                        height: 24, 
                        backgroundColor: `${priorityInfo.color}20`,
                        color: priorityInfo.color,
                        fontWeight: 500
                      }}
                    />
                    <Tooltip title="Created on">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTimeIcon fontSize="small" sx={{ fontSize: 16, mr: 0.5, color: theme.palette.text.secondary }} />
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(task.createdAt)}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Box>
            
            {/* Action buttons for modifying the task */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Edit task">
                <IconButton 
                  size="small" 
                  onClick={() => setIsEditing(true)}
                  color="primary"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete task">
                <IconButton 
                  size="small" 
                  onClick={handleDeleteClick} // Changed from direct dispatch
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Paper>
    
  );
}

// Memo prevents unnecessary re-renders
// (only re-renders when the task prop changes)
export default React.memo(TaskItem);
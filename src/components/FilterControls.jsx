import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSortBy } from '../redux/tasksSlice';
import { FormControl, InputLabel, Select, MenuItem, Box, Paper, ToggleButtonGroup, ToggleButton, Typography, Divider, useTheme } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FlagIcon from '@mui/icons-material/Flag';

// handling all the filtering and sorting options for tasks
function FilterControls() {
  const dispatch = useDispatch();
  const { filter, sortBy } = useSelector(state => state.tasks);
  const theme = useTheme();

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 3,
      }}>
        {/* Filter section - lets users choose which tasks to display */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          width: { xs: '100%', md: 'auto' }
        }}>
          <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="subtitle2" fontWeight="bold" sx={{ mr: 2 }}>
            Filter:
          </Typography>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(e, newFilter) => {
                            if (newFilter !== null) {
                dispatch(setFilter(newFilter));
              }
            }}
            size="small"
            aria-label="task filter"
            sx={{ flexGrow: { xs: 1, md: 0 } }}
          >
            <ToggleButton value="all" aria-label="all tasks">
              <FormatListBulletedIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>All</Typography>
            </ToggleButton>
            <ToggleButton value="active" aria-label="active tasks">
              <PendingActionsIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>Active</Typography>
            </ToggleButton>
            <ToggleButton value="completed" aria-label="completed tasks">
              <CheckCircleOutlineIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>Completed</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        
        {/* Responsive dividers - changes orientation based on screen size */}
        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
        <Divider sx={{ display: { xs: 'block', md: 'none' }, width: '100%' }} />
        
        {/* Sort controls - decides the order tasks appear in the list */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          width: { xs: '100%', md: 'auto' } 
        }}>
          <SortIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="subtitle2" fontWeight="bold" sx={{ mr: 2 }}>
            Sort:
          </Typography>
          <ToggleButtonGroup
            value={sortBy}
            exclusive
            onChange={(e, newSortBy) => {
              if (newSortBy !== null) {
                dispatch(setSortBy(newSortBy));
              }
            }}
            size="small"
            aria-label="sort by"
            sx={{ flexGrow: { xs: 1, md: 0 } }}
          >
            <ToggleButton value="date" aria-label="sort by date">
              <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>Date</Typography>
            </ToggleButton>
            <ToggleButton value="priority" aria-label="sort by priority">
              <FlagIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>Priority</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Paper>
  );
}

// Wrapped in memo to prevent unnecessary re-renders - good for performance!
export default React.memo(FilterControls);
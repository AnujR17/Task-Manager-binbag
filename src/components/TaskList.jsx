import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskItem from './TaskItem';
import { selectTasks, reorderTasks } from '../redux/tasksSlice';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Main component that renders the list of tasks with drag & drop functionality
function TaskList() {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleDragEnd = (result) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    // If position didn't change
    if (result.source.index === result.destination.index) {
      return;
    }

    // Dispatch action to update task order in the store after dragging
    dispatch(reorderTasks({
      sourceIndex: result.source.index,
      destinationIndex: result.destination.index
    }));
  };

  // Placeholder when there are no tasks
  if (tasks.length === 0) {
    return (
      <Paper sx={{ 
        p: 4, 
        textAlign: 'center',
        borderRadius: 2,
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
      }}>
        <AssignmentIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No tasks found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add a new task or change your filters to see tasks
        </Typography>
      </Paper>
    );
  }

  return (
    // Wrap list in DragDropContext to enable drag & drop functionality
    // The onDragEnd callback is fired when a drag operation ends
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <div 
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {/* Map through tasks and make each one draggable */}
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TaskList;
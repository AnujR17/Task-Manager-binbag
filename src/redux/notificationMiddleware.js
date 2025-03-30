import { toast } from 'react-hot-toast';

// This middleware listens for task-related actions and shows appropriate notifications
export const notificationMiddleware = store => next => action => {
  // Store the state of the task before the action takes place
  let prevTask = null;
  if (action.type === 'tasks/updateTask') {
    prevTask = store.getState().tasks.items.find(task => task.id === action.payload.id);
  }
    const result = next(action);
  
    if (action.type === 'tasks/addTask') {
      toast.success('Task added successfully!');
    } else if (action.type === 'tasks/updateTask') {
      if (!prevTask) {
        toast.success('Task updated successfully!');
      } 
      else if (prevTask.completed !== action.payload.completed) {
        if (action.payload.completed) {
          toast.success('Task completed!');
        } else {
          toast.success('Task restored to active!');
        }
      } else {
        toast.success('Task details updated!');
      }
    } else if (action.type === 'tasks/deleteTask') {
      toast.success('Task deleted successfully!');
    }
    
    return result;
  };


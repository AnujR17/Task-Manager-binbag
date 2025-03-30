import { toast } from 'react-hot-toast';

// This middleware listens for task-related actions and shows appropriate notifications
export const notificationMiddleware = store => next => action => {
    const result = next(action);
  
    if (action.type === 'tasks/addTask') {
    toast.success('Task added successfully!');
  } else if (action.type === 'tasks/updateTask') {
    toast.success('Task updated successfully!');
  } else if (action.type === 'tasks/deleteTask') {
    toast.success('Task deleted successfully!');
  }
    
  return result;
};
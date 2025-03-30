import { createSlice } from '@reduxjs/toolkit';

// Helper to load initial tasks from localStorage
// This way our tasks persist between page refreshes!
const getInitialTasks = () => {
  try {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: getInitialTasks(),
    filter: 'all', 
    sortBy: 'date',
  },
  reducers: {
    // Adds a new task to the list
    addTask: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    // Updates an existing task by replacing it entirely
    // Identifying the task by its id
    updateTask: (state, action) => {
      state.items = state.items.map(task => 
        task.id === action.payload.id ? action.payload : task
      );
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    // Removes a task from the list
    deleteTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    // Used when drag-and-drop reordering tasks
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const result = Array.from(state.items);
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destinationIndex, 0, removed);
      
      state.items = result;
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    // Changes which tasks are visible based on completion status
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    // Changes the order of tasks (by date or priority)
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, reorderTasks, setFilter, setSortBy } = tasksSlice.actions;

// This selector handles both filtering and sorting in one place
export const selectTasks = (state) => {
  const { items, filter, sortBy } = state.tasks;
  
  // Filter the tasks based on completion status
  let filteredTasks = [...items];
  if (filter === 'active') {
    filteredTasks = items.filter(task => !task.completed);
  } else if (filter === 'completed') {
    filteredTasks = items.filter(task => task.completed);
  }
  

  if (sortBy === 'priority') {
    const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
    filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  } else { 
    filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  
  return filteredTasks;
};

export default tasksSlice.reducer;
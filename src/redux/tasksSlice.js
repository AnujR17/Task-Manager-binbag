import { createSlice, createSelector } from '@reduxjs/toolkit';
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
      state.sortBy = 'none';
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
const selectTasksItems = state => state.tasks.items;
const selectTasksFilter = state => state.tasks.filter;
const selectTasksSortBy = state => state.tasks.sortBy;

export const selectTasks = createSelector(
  [selectTasksItems, selectTasksFilter, selectTasksSortBy],
  (items, filter, sortBy) => {
    // Filter the tasks
    let filteredTasks = items;
    if (filter === 'active') {
      filteredTasks = items.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filteredTasks = items.filter(task => task.completed);
    } else {
      filteredTasks = [...items]; // Only create a new array when necessary
    }
    
    // Apply sorting (only if a sorting method is active)
    if (sortBy === 'priority') {
      const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
      return [...filteredTasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'date') { 
      return [...filteredTasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    // No sorting (custom order from drag-and-drop)
    return filteredTasks;
  }
);

export default tasksSlice.reducer;
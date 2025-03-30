import { useState, useEffect } from 'react';

/**
 * Custom hook to persist state in localStorage
 * Super useful for preserving app state between page refreshes!
 */
function useLocalStorage(key, initialValue) {
  // Initialize state with value from localStorage or the provided initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
            console.log(error);
      return initialValue;
    }
  });

  // Sync to localStorage whenever state changes
  // This is the magic that keeps everything persisted!
  useEffect(() => {
    try {
// Save state to localStorage
// Save state to localStorage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // A more advanced implementation would handle the error
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;

import { useState, useEffect } from 'react';

const MERIT_STORAGE_KEY = 'prayer_wheel_merit';

export function useMeritCounter() {
  const [merit, setMerit] = useState(0);
  
  // Load merit from localStorage on component mount
  useEffect(() => {
    const storedMerit = localStorage.getItem(MERIT_STORAGE_KEY);
    if (storedMerit) {
      setMerit(parseInt(storedMerit, 10));
    }
  }, []);
  
  // Function to increment merit
  const incrementMerit = () => {
    const newMerit = merit + 1;
    setMerit(newMerit);
    localStorage.setItem(MERIT_STORAGE_KEY, newMerit.toString());
    return newMerit;
  };
  
  // Function to reset merit
  const resetMerit = () => {
    setMerit(0);
    localStorage.removeItem(MERIT_STORAGE_KEY);
  };
  
  return {
    merit,
    incrementMerit,
    resetMerit
  };
}

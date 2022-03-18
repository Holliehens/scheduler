import { useState } from "react";

export default function useVisualMode(initial) {

  //takes an initial mode, set the mode state with the initial mode provided

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  

  // Create a transition function within useVisualMode that will take in a new mode
  function transition(newMode, replace = false) {
    if (replace) {

      // Replace the last element in history array with newMode 
      const currentHistory = [...history];
      currentHistory[currentHistory.length - 1] = newMode;

      setMode(newMode);
      setHistory(currentHistory);

    } else {
      // update the mode state with the new value //
    setMode(newMode);
    setHistory([...history, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      const currentHistory = [...history];

      // pop() removes the last element in the history array (currentHistory is a copy of history array)
      currentHistory.pop();
      const prevMode = currentHistory[currentHistory.length - 1];
      
      setMode(prevMode);  //setting mode
      setHistory(currentHistory); // setting history
    }
  }
// return an object with a mode property
  return { mode, transition, back };
  
};

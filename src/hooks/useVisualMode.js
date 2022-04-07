import { useState } from "react";

export default function useVisualMode(initial) {
  //takes an initial mode, set the mode state with the initial mode provided

  
  const [history, setHistory] = useState([initial]);

  // Create a transition function within useVisualMode that will take in a new mode
  function transition(newMode, replace = false) {
    if (replace) {
    
      
      setHistory((prev) => {
        const currentHistory = [...prev];
        // Replace the last element in history array with newMode
        currentHistory[currentHistory.length - 1] = newMode;
        return currentHistory;
      });

    } else {
      // update the mode state with the new value //
      setHistory((prev) => {
        return [...prev, newMode];
      })
    }
  }

  function back() {
    if (history.length > 1) {
      
      setHistory((prev) => {
        const currentHistory = [...prev];
        // pop() removes the last element in the history array (currentHistory is a copy of history array)
        currentHistory.pop();
        // setting history
        return currentHistory; 
      }); 
    }
  }
  // return an object with a mode property (mode is the last element of the history array)
  return { mode: history[history.length-1], transition, back };
}

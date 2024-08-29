import React, { useState, useEffect } from 'react';

const App = () => {
  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);
  const [second, setSecond] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [time, setTime] = useState(0); 

  useEffect(() => {
    let timer;

    if (isStart) {
      timer = setInterval(() => {
        handleTimerLogic();
      }, 10); 
    } else if (hours === 0 && min === 0 && second === 0) {
      setIsStart(false)
    }

    return () => clearInterval(timer);
  }, [isStart, hours, min, second]);

  const handleStart = () => {
    setHours(Math.floor(time / 60));
    setMin(time % 60);
    setSecond(0);
    setIsStart(true);
  };

  const  handleTimerLogic = ()=>{
    if (second === 0) {
      if (min === 0) {
        if (hours > 0) {
          setHours(prevHours => prevHours - 1);
          setMin(59);
          setSecond(59);
        }
      } else {
        setMin(prevMin => prevMin - 1);
        setSecond(59);
      }
    } else {
      setSecond(prevSecond => prevSecond - 1);
    }
  }

  const handleInputChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <div>
      <input
        type="number"
        onChange={handleInputChange}
        placeholder="Enter minutes"
        min="0"
      />
      <button onClick={handleStart}>START</button>
      <button onClick={() => setIsStart(false)}>STOP</button>
      <h1>
        {hours}:{min}:{second}
      </h1>
    </div>
  );
};

export default App; 
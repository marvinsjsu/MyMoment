import { useState, useEffect, useRef } from "react";

export function useTimer() {
  const [startDate, setStartDate] = useState<number>(Date.now());
  const [duration, setDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [currDate, setCurrDate] = useState(Date.now());
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        const dateNow = Date.now();
        const currElapsedTime = dateNow - startDate;
        setElapsedTime(currElapsedTime);
        setCurrDate(dateNow);
      }, 100);
    } else {
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  return {
    duration,
    currDate,
    isRunning,
    startDate,
    elapsedTime,
    setStartDate,
    setDuration,
    setIsRunning,
    setElapsedTime,
  };
}

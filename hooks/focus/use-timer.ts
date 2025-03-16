import { useState, useEffect, useRef } from "react";

export function useTimer() {
  const [startDate, setStartDate] = useState<number>(Date.now());
  const [duration, setDuration] = useState<number>(0); // Total duration (ms)
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [currDate, setCurrDate] = useState<number>(Date.now());
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // ✅ Fix type

  useEffect(() => {
    if (isRunning && !timerRef.current) {
      timerRef.current = setInterval(() => {
        const dateNow = Date.now();
        const currElapsedTime = dateNow - startDate;
        setElapsedTime(currElapsedTime);
        setCurrDate(dateNow);

        if (currElapsedTime >= duration) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setIsRunning(false);
        }
      }, 100);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, startDate, duration]);

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

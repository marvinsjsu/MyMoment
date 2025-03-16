import { useState, useEffect, useRef } from "react";

export function useTimer() {
  const [startDate, setStartDate] = useState<number>(Date.now());
  const [duration, setDuration] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [currDate, setCurrDate] = useState<number>(Date.now());
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && !isPaused && !timerRef.current) {
      timerRef.current = setInterval(() => {
        const dateNow = Date.now();
        const currElapsedTime = dateNow - startDate + elapsedTime;
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
  }, [isRunning, isPaused, startDate, duration]);

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPaused(true);
    setIsRunning(false);
  };

  const resumeTimer = () => {
    if (isPaused) {
      setStartDate(Date.now());
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  return {
    duration,
    currDate,
    isRunning,
    isPaused,
    startDate,
    elapsedTime,
    setStartDate,
    setDuration,
    setIsRunning,
    setElapsedTime,
    pauseTimer,
    resumeTimer,
  };
}

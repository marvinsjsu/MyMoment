import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import TimerCircle from "@/components/timer-circle";
import { useTimer } from "@/hooks/focus/use-timer";

const TIMER_DURATION = 2 * 60;

export default function HomeScreen() {
  const {
    duration,
    isRunning,
    elapsedTime,
    setStartDate,
    setDuration,
    setIsRunning,
  } = useTimer();

  return (
    <View style={styles.container}>
      <TimerCircle
        elapsedTime={elapsedTime}
        duration={duration}
        stop={!isRunning}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(37, 41, 46, 1)",
  },
  text: {
    color: "rgba(255, 255, 255, 1)",
  },
});

import { Text, View, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { useState, useEffect, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TimerCircle from "@/components/timer-circle";
import DigitalTimer from "@/components/digital-timer";
import { useTimer } from "@/hooks/focus/use-timer";
import { getFormattedTime } from "@/utils/";

const MS_IN_SECS = 1000;
const SECS_IN_MIN = 60;
const TWENTY_MINS = 20 * SECS_IN_MIN * MS_IN_SECS;
const FIFTEEN_MINS = 15 * SECS_IN_MIN * MS_IN_SECS;
const TEN_MINS = 10 * SECS_IN_MIN * MS_IN_SECS;
const FIVE_MINS = 5 * SECS_IN_MIN * MS_IN_SECS;

export default function FocusScreen() {
  const {
    duration,
    currDate,
    isRunning,
    startDate,
    elapsedTime,
    setStartDate,
    setDuration,
    setIsRunning,
    setElapsedTime,
  } = useTimer();

  const setTimerDuration = (duration: number) => {
    setDuration(FIVE_MINS);
  };

  const startTimer = () => {
    setStartDate(Date.now());
    setElapsedTime(0);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    // setIsRunning(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.taskContainer}>
        <Text style={styles.task}>
          build focus timer for a long string test here, lets see how it gets
          rendered
        </Text>
      </View>
      <View style={styles.clockContainer}>
        <TimerCircle
          elapsedTime={elapsedTime}
          duration={duration}
          stop={!isRunning}
        >
          <DigitalTimer duration={duration} elapsedTime={elapsedTime} />
        </TimerCircle>
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.durationContainer}>
          <Pressable
            onPress={() => setTimerDuration(25)}
            style={[
              styles.durationBtn,
              isRunning && styles.durationBtnDisabled,
            ]}
            disabled={isRunning}
          >
            <Text
              style={[
                styles.durationLabel,
                isRunning && styles.durationLabelDisabled,
              ]}
            >
              25
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setTimerDuration(20)}
            style={[
              styles.durationBtn,
              isRunning && styles.durationBtnDisabled,
            ]}
            disabled={isRunning}
          >
            <Text
              style={[
                styles.durationLabel,
                isRunning && styles.durationLabelDisabled,
              ]}
            >
              20
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setTimerDuration(15)}
            style={[
              styles.durationBtn,
              isRunning && styles.durationBtnDisabled,
            ]}
            disabled={isRunning}
          >
            <Text
              style={[
                styles.durationLabel,
                isRunning && styles.durationLabelDisabled,
              ]}
            >
              15
            </Text>
          </Pressable>
        </View>
        <View style={styles.startContainer}>
          <Pressable
            onPress={() => (isRunning ? pauseTimer() : startTimer())}
            style={styles.playBtn}
            disabled={duration === 0}
          >
            <MaterialCommunityIcons
              name={isRunning ? "pause-circle-outline" : "play-circle-outline"}
              size={100}
              color={`rgba(255, 211, 61, ${duration === 0 ? "0.5" : "1"})`}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(37, 41, 46, 1)",
  },
  taskContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 320,
  },
  task: {
    fontSize: 18,
    color: "rgba(255, 211, 61, 1)",
  },
  clockContainer: {
    flex: 1 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  outerClock: {
    justifyContent: "center",
    alignItems: "center",
    height: 320,
    width: 320,
    borderWidth: 10,
    borderColor: "rgba(255, 211, 61, 1)",
    borderRadius: 160,
  },
  innerClock: {
    justifyContent: "center",
    alignItems: "center",
    height: 280,
    width: 280,
    borderWidth: 10,
    borderColor: "rgba(255, 211, 61, 1)",
    borderRadius: 140,
  },
  timer: {
    fontSize: 32,
    color: "rgba(255, 255, 255, 1)",
  },
  text: {
    color: "rgba(255, 255, 255, 1)",
  },
  controlsContainer: {
    flex: 1 / 4,
    width: 320,
    gap: 20,
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  startContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  playBtn: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  playBtnDisabled: {},
  durationBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    borderWidth: 5,
    borderColor: "rgba(255, 211, 61, 1)",
    borderRadius: 25,
  },
  durationBtnDisabled: {
    borderColor: "rgba(255, 211, 61, 0.5)",
  },
  durationLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(255, 211, 61, 1)",
  },
  durationLabelDisabled: {
    color: "rgba(255, 211, 61, 0.5)",
  },
});

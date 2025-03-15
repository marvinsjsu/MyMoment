import React, { useEffect, useState, useRef, PropsWithChildren } from "react";
import { View, StyleSheet, Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";

const TIMER_DURATION = 2 * 60; // 20 minutes in seconds

type Props = {
  elapsedTime?: number;
  duration?: number;
  stop?: boolean;
};

export default function TimerCircle({
  elapsedTime = 0,
  duration = TIMER_DURATION,
  stop = false,
  children,
}: Props & PropsWithChildren) {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = elapsedTime / duration;
  const strokeDashoffset = circumference * (1 - progress);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (progress >= 1 && !stop) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [progress, stop]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Svg width="300" height="300" viewBox="0 0 110 110">
          <Circle
            cx="55"
            cy="55"
            r={radius}
            stroke="white"
            strokeWidth={strokeWidth}
            fill="none"
            opacity={0.3}
          />
          <Circle
            cx="55"
            cy="55"
            r={radius}
            stroke="rgba(255, 211, 61, 1)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference} // Full stroke
            strokeDashoffset={strokeDashoffset} // Animate progress
            strokeLinecap="round"
            rotation="-90" // Start from top
            origin="55,55"
          />
          <View style={styles.children}>{children}</View>
        </Svg>
      </Animated.View>
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
  children: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    width: 300,
  },
});

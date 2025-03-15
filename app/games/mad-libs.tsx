import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";

import ResetButton from "@/components/reset-button";

export default function MadLibScreen() {
  useEffect(() => {}, []);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(37, 41, 46, 1)",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: "rgba(255, 255, 255, 1)",
  },
  board: {
    flexWrap: "wrap",
    flexDirection: "row",
    width: 320,
    height: 320,
    padding: 0,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
  },
  cell: {
    alignItems: "center",
    justifyContent: "center",
    width: 106,
    height: 106,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 1)",
  },
  label: {
    fontSize: 40,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 1)",
  },
  controls: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-evenly",
    padding: 24,
  },
});

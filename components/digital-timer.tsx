import { View, Text, StyleSheet } from "react-native";

import { getRemainingTime } from "@/utils/focus";
import { PRIMARY_GRAY, PRIMARY_YELLOW } from "@/constants/styles";

type Props = {
  duration: number;
  elapsedTime: number;
};

export default function DigitalTimer({ duration, elapsedTime }: Props) {
  const { minutes, seconds } = getRemainingTime(duration, elapsedTime);
  const minDisplay = minutes.toString().padStart(2, "0");
  const secDisplay = seconds.toString().padStart(2, "0");
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`${minDisplay}:${secDisplay}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 35,
  },
  label: {
    fontSize: 36,
    color: PRIMARY_YELLOW,
  },
});

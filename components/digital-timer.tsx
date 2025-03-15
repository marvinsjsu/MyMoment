import { View, Text, StyleSheet } from "react-native";

type Props = {
  duration: number;
  elapsedTime: number;
};

export default function DigitalTimer({ duration, elapsedTime }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`${duration} - ${elapsedTime}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 35,
  },
  label: {},
});

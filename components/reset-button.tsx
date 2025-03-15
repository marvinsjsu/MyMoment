import { View, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { PRIMARY_YELLOW } from "@/constants/styles";

type Props = {
  onPress?: () => void;
  disabled?: boolean;
};

export default function CircleButton({ onPress, disabled = false }: Props) {
  const containerStyle = disabled
    ? { ...styles.container, ...styles.disabledContainer }
    : styles.container;

  const buttonStyle = disabled
    ? { ...styles.button, ...styles.disabledButton }
    : styles.button;

  return (
    <View style={containerStyle}>
      <Pressable style={buttonStyle} disabled={disabled}>
        <MaterialIcons
          name="refresh"
          size={30}
          color={PRIMARY_YELLOW}
          onPress={onPress}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: "#ffd33d",
    borderRadius: 42,
    padding: 3,
  },
  disabledContainer: {
    borderColor: "rgba(0, 0, 0, 0.5)",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    // backgroundColor: PRIMARY_YELLOW,
  },
  disabledButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

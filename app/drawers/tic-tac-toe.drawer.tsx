import { StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

export default function TicTacToeDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="close"
        onPress={() => props.navigation.navigate("tic-tac-toe")}
        labelStyle={styles.drawerLabel}
      />
      <DrawerItem
        label="Restart Game"
        onPress={() => props.navigation.navigate("Restart Game")}
        labelStyle={styles.drawerLabel}
      />
      <DrawerItem
        label="Game Rules"
        onPress={() => props.navigation.navigate("Game Rules")}
        labelStyle={styles.drawerLabel}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerLabel: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
  },
});

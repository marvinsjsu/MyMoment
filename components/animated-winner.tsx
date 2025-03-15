import { View, Animated, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";

import { getRandomIndex } from "@/utils/games/tic-tac-toe.utils";

const EMOJIS = ["🙌", "🎉", "🥳", "🎊", "👏", "🕺", ""];
const PHRASES = ["takes the win!", "gots it!", "gets it done!", "wins!"];

type Props = {
  winningPlayer: string;
};

export default function AnimatedWinner({ winningPlayer }: Props) {
  const animated = useRef(new Animated.Value(1)).current;
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [phrase, setPhrase] = useState(PHRASES[0]);

  useEffect(() => {
    const emojiIndex = getRandomIndex(EMOJIS.length);
    const phraseIndex = getRandomIndex(PHRASES.length);

    setEmoji(EMOJIS[emojiIndex]);
    setPhrase(PHRASES[phraseIndex]);

    Animated.sequence([
      Animated.delay(400),
      Animated.spring(animated, {
        toValue: 1.5,
        friction: 1.5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [winningPlayer]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.label, { transform: [{ scale: animated }] }]}
      >
        "{winningPlayer}" {phrase} {emoji}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(255, 211, 61, 1)",
  },
});

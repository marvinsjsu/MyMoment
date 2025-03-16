import { Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";

import Accordion from "@/components/accordion";
import { PRIMARY_GRAY, PRIMARY_YELLOW } from "@/constants/styles";

const SECTIONS = [
  {
    key: "why-games",
    title: "Why the games on this app?",
    content: `
      Too often, being in waiting rooms for appointments, my older daughter and I
      would try to find things to do together to pass time before being
      called in. At one of these appointments, I thought why not find and
      download a "Connect-Four" game from the Apple App store - Sophia loves
      trying to beat me in this game 😝😉😊. We ended up downloading a few,
      and all of these had us go through a bunch of ads for other games
      before we could play. Well, I thought why not build an app with a
      few of the games my daughter enjoyed and make it without any ads.
    `,
  },
  {
    key: "why-focus",
    title: "Why the focus section?",
    content: `
      Having been in waiting rooms for appointments, my older daughter and I
      would try to find things to do together to pass time before being
      called in. At one of these appointments, I thought why not find and
      download a "Connect-Four" game from the Apple App store - Sophia loved
      trying to beat me in this game 😉😊. We ended up downloading a few,
      and all of these had us go through a bunch of ads for other games
      before we could play a game. Well, the next thought was why not build
      an app with a few of the games my daughter enjoyed and make t not have
      any ads.
    `,
  },
  {
    key: "why-journal",
    title: "Why the thoughts section?",
    content: `
      Having been in waiting rooms for appointments, my older daughter and I
      would try to find things to do together to pass time before being
      called in. At one of these appointments, I thought why not find and
      download a "Connect-Four" game from the Apple App store - Sophia loved
      trying to beat me in this game 😉😊. We ended up downloading a few,
      and all of these had us go through a bunch of ads for other games
      before we could play a game. Well, the next thought was why not build
      an app with a few of the games my daughter enjoyed and make t not have
      any ads.
    `,
  },
];
export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.textMain}>
          This app is dedicated to my daughters, Sophia and Malia 💕
        </Text>
        <Accordion items={SECTIONS} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: PRIMARY_GRAY,
    padding: 20,
  },
  textMain: {
    fontSize: 24,
    lineHeight: 36,
    color: PRIMARY_YELLOW,
    paddingTop: 20,
    paddingBottom: 20,
  },
  text: {
    fontSize: 18,
    lineHeight: 36,
    color: PRIMARY_YELLOW,
  },
});

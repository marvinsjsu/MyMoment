import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { PRIMARY_GRAY, PRIMARY_YELLOW } from "@/constants/styles";

type Section = {
  key: string;
  title: string;
  content: string;
};

type Props = {
  items: Section[];
};

export default function Accordion({ items }: Props) {
  const [activeSectionKeys, setActiveSectionKeys] = useState(new Set());

  const handlePressTitle = (key: string) => {
    setActiveSectionKeys((prev) => {
      prev.has(key) ? prev.delete(key) : prev.add(key);
      return new Set(prev);
    });
  };

  return (
    <View style={styles.container}>
      {items.map(({ key, title, content }) => (
        <View key={key} style={styles.section}>
          <Pressable onPress={() => handlePressTitle(key)}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>{title}</Text>
              <MaterialCommunityIcons
                name={
                  activeSectionKeys.has(key) ? "chevron-up" : "chevron-down"
                }
                size={24}
                color={PRIMARY_YELLOW}
              />
            </View>
          </Pressable>
          {activeSectionKeys.has(key) && (
            <View style={styles.sectionContentContainer}>
              <Text style={styles.sectionContent}>
                {content.replace(/\s+/g, " ")}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  section: {},
  sectionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: PRIMARY_YELLOW,
  },
  sectionTitle: {
    fontSize: 18,
    color: PRIMARY_YELLOW,
    padding: 12,
  },
  sectionContentContainer: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 28,
    color: PRIMARY_YELLOW,
    padding: 8,
    textAlign: "left",
  },
});

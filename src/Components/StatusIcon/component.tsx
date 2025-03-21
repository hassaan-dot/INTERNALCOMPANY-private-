import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StatusBadgeProps {
  text?: string;
  color?: string;
  backgroundColor?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  text = "Placed for collection",
  color = "#FFC727",
  backgroundColor = "#FFF8E1",
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default StatusBadge;

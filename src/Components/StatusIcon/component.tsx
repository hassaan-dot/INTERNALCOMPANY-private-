import { PoppinsRegular } from "@/constants/fonts";
import helpers from "@/src/utils/helpers";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StatusBadgeProps {
  text?: string;
  color?: string;
  backgroundColor?: string;
  dot: any;
  textColor: any;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  text = "Placed for collection",
  color = "#EBFDF3",
  dot = "#12B76A",
  textColor = "#027A48",
  backgroundColor = "#FFF8E1",
}) => {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={[styles.dot, { backgroundColor: dot }]} />
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 12,
    // right: 18,
    // width: "43%",
    // flex: 1,

    borderRadius: 20,
  },
  dot: {
    width: 8,
    height: 8,
    alignSelf: "center",
    borderRadius: 4,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "300",
    color: "#027A48",
    textAlign: "center",
    fontFamily: PoppinsRegular,
  },
});

export default StatusBadge;

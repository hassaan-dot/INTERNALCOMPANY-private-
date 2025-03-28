import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 999999,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },

  layer: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

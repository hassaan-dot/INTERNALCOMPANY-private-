import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    marginRight: 20,
    marginTop: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
  },
  dropdown: {
    position: "absolute",
    top: 40,
    right: 25,
    backgroundColor: "white",
    padding: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  signOutText: {
    fontSize: 14,
    color: "red",
  },
});

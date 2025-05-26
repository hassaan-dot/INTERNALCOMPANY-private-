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
    backgroundColor: "white",
    padding: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  usernameText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  clockButton: {
    fontSize: 16,
    color: "#4CAF50",
    marginBottom: 10,
    textAlign: "center",
  },
  signOutText: {
    fontSize: 16,
    color: "#f44336",
    textAlign: "center",
  },

});

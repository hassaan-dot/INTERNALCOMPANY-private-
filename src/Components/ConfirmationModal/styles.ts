import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    position: "absolute",
    top: "40%",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    width: 300,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
    color: "#111",
  },
  message: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
    color: "#444",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 15,
    color: "#777",
  },
  confirmText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

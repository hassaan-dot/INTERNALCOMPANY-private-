import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
    elevation: 2,
  },
  modal: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 230,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 10,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "transparent",
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: "#555",
  },
  pickerContainer: {
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    overflow: "hidden",
  },
  langButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    marginVertical: 6,
    alignItems: "center",
  },

  langText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

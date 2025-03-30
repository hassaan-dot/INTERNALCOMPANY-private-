import { StyleSheet } from "react-native";
import helpers from "../../utils/helpers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 15,
    backgroundColor: "#fff",
    paddingRight: helpers.normalize(80),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputContainer: { flex: 1, marginBottom: 5 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 5 },
  input: {
    // borderColor: "#ddd",
    borderWidth: 1,

    minHeight: helpers.normalize(80),
    textAlignVertical: "top",

    borderRadius: 8,
  },
  input1: {
    // width: helpers.wp(30),
    padding: 10,
    paddingVertical: 12,
    borderWidth: 1,
    // borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 5,
    marginRight: 25,
  },
  notes: { height: 80, textAlignVertical: "top" },
  uploadButton: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  buttonRow: {
    paddingRight: 25,
    marginTop: 20,
  },
  cancelButton: {
    padding: 10,

    alignItems: "center",
    borderRadius: 8,
    width: helpers.wp(16),
    borderColor: "#D0D5DD",
    borderWidth: 1,

    marginRight: 10,
  },
  addButton: {
    padding: 10,
    backgroundColor: "#07504B",
    alignItems: "center",
    borderRadius: 8,
    width: helpers.wp(16),
    borderColor: "#D0D5DD",
    borderWidth: 1,

    marginRight: 10,
  },
  buttonTextCancel: { color: "#000", fontSize: 16, fontWeight: "600" },

  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
export default styles;

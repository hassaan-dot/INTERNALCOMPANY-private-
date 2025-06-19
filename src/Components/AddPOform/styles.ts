import { I18nManager, StyleSheet } from "react-native";
import helpers from "../../utils/helpers";

const isRTL = I18nManager.isRTL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: isRTL ? "row-reverse" : "row",
    justifyContent: "flex-start",
    marginBottom: 15,
  },
  inputContainer: {
    width: "50%",
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: isRTL ? "right" : "left",
  },
  input: {
    borderColor: "#D0D5DD",
    borderWidth: 1,
    minHeight: helpers.normalize(70),
    textAlignVertical: "top",
    padding: 15,
    borderRadius: 10,
    textAlign: isRTL ? "right" : "left",
  },
  input1: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 10,
    marginBottom: 10,
    textAlign: isRTL ? "right" : "left",
  },
  notes: {
    height: 80,
    textAlignVertical: "top",
  },
  uploadButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonRow: {
    marginTop: 30,
    flexDirection: isRTL ? "row-reverse" : "row",
    justifyContent: "flex-end",
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#D0D5DD",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#07504B",
    alignItems: "center",
    borderRadius: 10,
    marginStart: 10,
  },
  buttonTextCancel: {
    color: "#344054",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  attachmentChip: {
    flexDirection: isRTL ? "row-reverse" : "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#07504B",
    borderRadius: 20,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  attachmentText: {
    color: "#fff",
    fontSize: 12,
    marginHorizontal: 6,
    textAlign: isRTL ? "right" : "left",
  },
});

export default styles;

import { StyleSheet } from "react-native";
import helpers from "../../../utils/helpers";
import { PoppinsRegular } from "../../../Resources/fonts";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  inputContainer: { width: "100%", marginVertical: 25 },
  container1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickdocument: {
    backgroundColor: "#f6f6f6",
    padding: 5,
    paddingVertical: 0,
    marginLeft: 7,
    borderRadius: 4,
    justifyContent: "center",
  },
  container2: {
    borderRadius: 6,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingVertical: 7,
    width: "100%",
  },
  container4: { flexDirection: "row", alignItems: "center" },
  filetext: {
    fontSize: 20,
    fontWeight: "600",

    fontFamily: PoppinsRegular,
    bottom: 10,
  },
  modalContainer: {
    width: "30%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,

    marginVertical: 10,
  },
  fontSize: { fontSize: 14 },
  icon: {
    backgroundColor: "#0F3D3E",
    borderRadius: 50,
  },
  inputNote: {
    width: "100%",
    padding: 9,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 5,
    height: helpers.hp(15),
  },
  title: {
    fontSize: 18,
    fontFamily: PoppinsRegular,
    fontWeight: "500",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
    marginBottom: 20,
  },
  input: {
    // width: "100%",
    flex: 1,
    padding: 9,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    borderRadius: 5,
    marginRight: 5,
  },
  cancelText: {
    color: "black",
  },
  addButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#0F3D3E",
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 5,
  },
  addText: {
    color: "white",
  },
  title1: {
    fontSize: 16,
    fontFamily: PoppinsRegular,
    color: "#333",
  },
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 50,
    marginBottom: 25,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 18,
    borderRadius: 8,
  },
  resendText: {
    color: "#07504B",
    fontSize: 14,
    textAlign: "center",
    fontFamily: PoppinsRegular,
  },
});

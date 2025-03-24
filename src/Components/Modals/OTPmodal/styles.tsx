import { StyleSheet } from "react-native";
import helpers from "../../../utils/helpers";
import { PoppinsRegular } from "../../../Resources/fonts";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    //   width: 320,
    width: helpers.wp(31),
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    // paddingHorizontal: 25,
   
    //   alignItems: "center",
  },
  iconContainer: {
    //   backgroundColor: "#ddd",
    // //   borderRadius: 30,
    //   padding: 10,
    //   marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontFamily:PoppinsRegular,
    //   textAlign: "center",
    //   marginBottom: 20,
    color: "#333",
  },

  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight:50,
    marginBottom: 25,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 18,
    //   marginRight:2,
    borderRadius: 8,
  },
  resendText: {
    color: "#e74c3c",
    fontSize: 14,
    textAlign:'center',
    fontFamily:PoppinsRegular,

    // marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#1e3d35",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    fontFamily:PoppinsRegular
  },
  
});

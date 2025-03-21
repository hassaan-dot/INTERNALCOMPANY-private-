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
    modalContainer: {
      width:helpers.wp(30),
      backgroundColor: "white",
      padding: 15,
      borderRadius: 10,
      // marginHorizontal:20,
      marginVertical:10
      // alignItems: "center",
    },
    fontSize:{fontSize:14},
    icon: {
      backgroundColor: "#0F3D3E",
      borderRadius: 50,
    },
    inputNote:{
      width: "100%",
      padding: 9,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 5,
      marginBottom: 5,
      height:helpers.hp(15)
    },
    title: {
      fontSize: 18,
      fontFamily:PoppinsRegular,
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
  });
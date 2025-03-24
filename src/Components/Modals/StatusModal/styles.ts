import { StyleSheet } from "react-native";
import helpers from "../../../utils/helpers";
import { PoppinsBold, PoppinsRegular, PoppinsSemiBold } from "../../../Resources/fonts";

export const styles = StyleSheet.create({

    container: {
      backgroundColor: "white",
      paddingVertical:22,
      paddingHorizontal:10,
      borderRadius: 10,
      width:helpers.wp(32),
      // flex:1, `
      // alignItems: "center",
      // justifyContent:'center'
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
      // textAlign:'center',
      fontFamily:PoppinsSemiBold
    },
    


    sendButton: {
      backgroundColor: "#1E4D42",
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 8,
      marginTop: 20,
      width: "100%",
      alignItems: "center",
    },
    sendText: {
      color: "white",
      fontSize: 16,
      fontWeight: "200",
      fontFamily:PoppinsRegular

    },

    container1: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    dashedSquare: {
      width: 80,
      height: 60,
      borderWidth: 2,
      borderColor: "blue",
      borderStyle: "dashed",
      alignItems: "center",
      justifyContent: "center",
    },
    outerCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 4,
      borderColor: "blue",
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
    innerCircle: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },
  });
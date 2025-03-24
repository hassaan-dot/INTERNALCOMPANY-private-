import { StyleSheet } from "react-native";
import { PoppinsRegular } from "../../Resources/fonts";
import helpers from "../../utils/helpers";

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: "center",
      // margin:10,
    //   gap: 10,
    //   marginVertical: 10,
    },
    button: {
      backgroundColor: "#f8f8f8",
      paddingVertical: 8,
      // paddingHorizontal: 30,
      borderRadius: 6.7,
      margin:5,
      marginHorizontal:4,
      borderWidth:1,
      alignItems:'center',
      justifyContent:'center',
      // flex:1,
      // flexDirection:'row',
      width:helpers.wp(12)
    },
    text: {
      color: "white",
      fontSize: 13.41,
      fontWeight:'500',
      fontFamily:PoppinsRegular
    //   fontWeight: "bold",
    },
  });
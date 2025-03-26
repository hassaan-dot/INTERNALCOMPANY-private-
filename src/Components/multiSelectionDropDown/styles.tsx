import { StyleSheet } from "react-native";
import helpers from "@/src/utils/helpers";
import { PoppinsRegular } from "@/constants/fonts";

export const styles = StyleSheet.create({
    container:{marginVertical:5},
    title: {
        fontSize: 16,
        fontWeight: "400",
        // marginBottom: 4,
        fontFamily: PoppinsRegular,
      },
    dropdownBox: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    //   padding: 10,
    paddingHorizontal:10,
      marginTop: 5,
      paddingVertical:8,
    },
    dropdownInput: {
      fontSize: 15,
      color:"#2C2C2D"
    },
    dropdownList: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginTop: 5,
    },
    dropdownBadge: {
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
      paddingHorizontal: 8,
    //   paddingVertical: 4,
      marginRight: 5,
      marginBottom: 5,
    },
    dropdownBadgeText: {
      fontSize: 12,
      color:'#2C2C2D'
    },
  });
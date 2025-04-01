import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { PoppinsRegular } from "@/constants/fonts";

const styles = StyleSheet.create({
  container2: {
    fontFamily: PoppinsRegular,
    flex: 1,
  },
  container1: {
    borderWidth: 1,
    borderColor: "#00504B",
    borderRadius: 10,
    padding: 10,

    fontWeight: "500",
    fontSize: 16,
    flex: 1,
    paddingVertical: 14,
    // paddingVertical: 12,
    // textAlignVertical:'top',
    fontFamily: PoppinsRegular,
    // paddingHorizontal: 10,
    // fontSize: 15,
    // height: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
    fontFamily: PoppinsRegular,
  },
});
export default styles;

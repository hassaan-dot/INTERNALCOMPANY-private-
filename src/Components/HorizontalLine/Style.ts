import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { PoppinsRegular } from "../../Resources/fonts";

const styles = (
  width: string | number,
  color?: string,
  lineHeight: number = 1,
  marginVertical: number = 10
) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      width: width,
      marginVertical: marginVertical,
    } as ViewStyle,
    line: {
      flex: 1,
      height: lineHeight,
      backgroundColor: color || "#ddd",
      fontFamily: PoppinsRegular,
    } as ViewStyle,
    text: {
      marginHorizontal: 10,
      color: "black",
    } as TextStyle,
  });
};

export default styles;

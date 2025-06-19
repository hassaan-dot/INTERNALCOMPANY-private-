import { StyleSheet } from "react-native";
import helpers from "../../../utils/helpers";
import { PoppinsRegular } from "../../../Resources/fonts";

interface Theme {
  colors: {
    secondary: string;
    secondaryText: string;
    primaryText: string;
    errorDialig: string;
  };
  fontSizeX: number;
  secondaryRadius: number;
}

class style {
  static getSheet(theme: Theme) {
    return StyleSheet.create({
      containerStyle: {
        overflow: "visible",
      },
      innerContainerStyle: {
        backgroundColor: theme.colors.secondary,
        flexDirection: "row",
      },
      textStyle: {
        paddingBottom: helpers.normalize(8),
        fontSize: helpers.normalize(14) * theme.fontSizeX,
        color: theme.colors.secondaryText,
      },
      boldTextStyle: {
        paddingBottom: helpers.normalize(2),
        fontSize: helpers.normalize(16) * theme.fontSizeX,
        color: theme.colors.primaryText,
        fontFamily: PoppinsRegular,
      },
      iconStyle: {
        width: helpers.normalize(21),
        height: helpers.normalize(21),
        alignSelf: "center",
        marginHorizontal: helpers.normalize(12),
      },
      iconImageStyle: {
        width: helpers.normalize(25),
        height: helpers.normalize(25),
        alignSelf: "center",
      },
      inputStyle: {
        fontSize: helpers.normalize(14) * theme.fontSizeX,
        flex: 1,
        paddingHorizontal: helpers.normalize(10),
        backgroundColor: "transparent",
        height: helpers.normalize(50),
        textAlignVertical: "center",
      },
      placeholderStyle: {
        fontSize: helpers.normalize(14) * theme.fontSizeX,
        flex: 1,
        color: theme.colors.primaryText,
      },
      errorTitleStyle: {
        textAlign: "left",
        fontSize: helpers.normalize(17) * theme.fontSizeX,
        fontFamily: PoppinsRegular,
        color: "white",
        paddingHorizontal: helpers.normalize(5),
      },
      errorDescpStyle: {
        textAlign: "left",
        fontSize: helpers.normalize(12) * theme.fontSizeX,
        fontFamily: PoppinsRegular,
        color: "white",
        paddingHorizontal: helpers.normalize(5),
      },
      errorBoxStyle: {
        flexDirection: "row",
        marginVertical: helpers.normalize(4),
        borderColor: theme.colors.errorDialig,
        borderRadius: helpers.normalize(theme.secondaryRadius),
        backgroundColor: theme.colors.errorDialig,
        padding: helpers.normalize(10),
        overflow: "hidden",
        justifyContent: "flex-start",
      },
    });
  }
}

export default style;

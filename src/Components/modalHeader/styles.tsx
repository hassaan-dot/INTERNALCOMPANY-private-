import { StyleSheet } from "react-native";
import helpers from "../../utils/helpers";
import { PoppinsBold,MontserratBold,TangerineBold, PoppinsSemiBold } from "../../Resources/fonts";

export const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    // top: helpers.normalize(10),
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowContainer: {
    flex: 0.25,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  ArrowBackIcon: {
    width: helpers.normalize(17),
    height: helpers.normalize(16),
    top: 0,
    left: helpers.normalize(6),
    tintColor: "#E22691",
  },
  ArrowCrossIcon: {
    flex: 0.25,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  ImageCrossIcon: { width: 45, height: 45, tintColor: "#E22691" },
  title: {
    fontSize: 25,
    color: "#E22691",
    // fontWeight: "bold",
    
    // textAlign: "center",
    fontFamily:PoppinsSemiBold
    // marginHorizontal:helpers.normalize(10)
  },
  subtitle: {
    fontSize: 18,
    color: "#d63384",
    fontWeight: "bold",
    marginTop: 4,
    right: helpers.normalize(20),
  },
  each: {
    flex: 0.5,
    // backgroundColor:"blue",
    // top: helpers.normalize(7),
    flexDirection: "row",
    justifyContent: "center",
  },
});

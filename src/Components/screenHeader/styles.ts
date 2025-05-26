import { I18nManager, StyleSheet } from "react-native";
import {
  PoppinsBold,
  PoppinsRegular,
  PoppinsSemiBold,
} from "../../Resources/fonts";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },
  TitleDesign: {
    fontSize: 32,
    fontWeight: "800",
    color: "#000000",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: PoppinsSemiBold,
  },
  createButton: {
    padding: 8,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#07504B",
    flexDirection: "row",
    marginRight: 8,
    alignItems: "center",
  },
  createText: {
    color: "#07504B",
    fontWeight: "500",
    fontSize: 15,
    fontFamily: PoppinsRegular,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
});
export default styles;

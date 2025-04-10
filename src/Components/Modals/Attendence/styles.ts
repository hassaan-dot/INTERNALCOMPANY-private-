import { StyleSheet } from "react-native";
import { PoppinsRegular } from "../../../Resources/fonts";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 20,
    width: "33%",
  },
  container1: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  chipText2: {
    fontWeight: "500",
    color: "#000",
    fontSize: 18,
    fontFamily: PoppinsRegular,
    marginVertical: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: PoppinsRegular,
  },

  chipText: {
    fontWeight: "400",
    color: "#667085",
    fontSize: 14,
    fontFamily: PoppinsRegular,
    marginVertical: 6,
  },
});

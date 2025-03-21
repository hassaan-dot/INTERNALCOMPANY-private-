import { StyleSheet } from "react-native";
import { PoppinsSemiBold } from "../../../Resources/fonts";

export const styles = StyleSheet.create({
  Imagecard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "#000",
    height: "95%", 
    shadowOffset: { width: 0, height: 4 },

    boxShadow: '0px 2px 4px 4px rgba(255, 105, 180, 0.5)',

  },
  backgroundImage: {
    width: "100%",
    height: "100%", 
    borderRadius: 20,
    paddingHorizontal: 25,
    padding: 50,
    justifyContent: "center",
  }, overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 105, 180, 0.5)',
    borderRadius: 15, 
  },

  question: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily:PoppinsSemiBold
  },
});

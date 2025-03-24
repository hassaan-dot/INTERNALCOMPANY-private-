import { StyleSheet } from "react-native";
import helpers from "../../utils/helpers";
import { PoppinsRegular } from "../../Resources/fonts";

export const styles = StyleSheet.create({
  container: {},
  option: {
    // backgroundColor: "#FCE4EC",
    // borderRadius: 14,
    // padding: 10,
    // paddingVertical: 2,
    
    marginBottom: 17,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedOptionTrue: {
    // backgroundColor: "#D3ECCF",

    borderColor: "#5EA35B",
    // borderWidth: 2,
  },
  selectedOptionFalse: {
    // backgroundColor: "#FFEBF8",

    // borderColor: "#F51796",
    // borderWidth: 2,
  },
  optionText: {
    lineHeight: 22,
    fontSize: 16,
    // textAlign:'center',
    textAlignVertical: "top",
    color: "#2D2234",
    fontFamily:PoppinsRegular,
    fontWeight: "400",
  },
  selectedOptionText: {
    lineHeight: 22,
    color: "#2D2234",
  },
  unSelected: {
    // backgroundColor: "#FFEBF8",
    // borderColor: "#F48FB1",
  },
  icon: {
    width: helpers.normalize(20),
    height: helpers.normalize(20),
  },
  tick: {
    color: "green", 
  },
  cross: {
    color: "red",
  },
  container1: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dashedSquare: {
    width: 20,
    height: 20,
    // borderWidth: 2,
    borderColor: "blue",
    // borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  outerCircle: {
    width: 16,
    height: 16,
    borderRadius: 25,
    borderWidth: 2,

    borderColor: "#1E1E1E",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 8,
    height: 8,
    margin:10,
    borderRadius: 25,
    borderWidth: 2,

    borderColor: "#1E38A8",
    backgroundColor: "blue",

  },
});

import { StyleSheet } from "react-native";
import helpers from "../../utils/helpers";
import { PoppinsRegular } from "../../Resources/fonts";

const styles = StyleSheet.create({
  sidebar: {
    width: helpers.wp(18),
    backgroundColor: "#fff",
    paddingVertical: 20,
    // justifyContent:'center',
    // flex:1,
    paddingHorizontal: 10,
  },
  childView: { marginTop: helpers.normalize(25) },
  inactive: {
    color: "#A47C60",
    textAlign: "center",
    fontSize: 14,
    fontWeight: '500',
    fontFamily:PoppinsRegular,

  },
  item: {
    marginVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    padding: 15,
    fontWeight: 400,

    borderRadius: 8,
    backgroundColor: "#FFF",
  },
  active: {
    marginVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    padding: 12,
    fontFamily:PoppinsRegular,

    borderRadius: 10,
    backgroundColor: "#07504B",
  },
  itemText: {
    // marginLeft: 15,
    color: "white",
    textAlign: "center",
    fontFamily:PoppinsRegular,
    fontSize: 14,
    fontWeight: '600',
    // color: "#000",
  },
  custom:{
    width: 20,
    height: 20,
    marginRight: 15,
  } 
});
export default styles;

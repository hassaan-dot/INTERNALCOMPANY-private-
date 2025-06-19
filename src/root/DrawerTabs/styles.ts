import { StyleSheet } from "react-native";
import { PoppinsRegular } from "../../Resources/fonts";
import helpers from "../../utils/helpers";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexWrap:'wrap',
    flexDirection: "row",
    padding: 30,

    paddingHorizontal: 25,
    backgroundColor: "#FFF",
  },
  loginButton: {
    borderRadius: 10,
    padding: 15,
    flex: 1,
    // width: helpers.wp(32),
    backgroundColor: "#07504B",
    alignItems: "center",
    justifyContent: "center",
  },

  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
    marginTop: 25,
  },

  textStyle: {
    fontFamily: PoppinsRegular,
    fontSize: 16,
    fontWeight: "100",
    color: "#5B5B5B",
  },

  titleTextStyle: {
    color: "#000",
    fontSize: 42.67,
    fontWeight: "600",
    fontFamily: PoppinsRegular,
  },
  loginText: {
    fontFamily: PoppinsRegular,
    fontWeight: "400",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  LoginBox: {
    borderRadius: 20,
  },
  login_desc1: {
    // flex: 1,
    // flex:1,
    // paddingHorizontal: 25,
    borderRadius: 29,
    // marginRight:5,
    // width:helpers.wp(50),
    justifyContent: "flex-end",
    backgroundColor: "#07504B",
  },
  login_desc2: {
    flex: 1,
    // padding: 100,
    padding: helpers.normalize(40),
    // paddingHorizontal:helpers.normalize(140),
    justifyContent: "center",
    // marginHorizontal:100
  },
});
export default styles;

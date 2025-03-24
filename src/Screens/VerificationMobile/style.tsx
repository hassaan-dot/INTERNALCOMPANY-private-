import { StyleSheet } from "react-native";
import { PoppinsRegular } from "../../Resources/fonts";
import helpers from "../../utils/helpers";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 30,
    paddingHorizontal: 25,
    backgroundColor: "#FFF",
  },
  section2: { justifyContent: "flex-end" },
  checkbox: { 
    borderColor: "black",
    width: 15,
    height: 15,
    marginHorizontal: 0,
    marginRight: 8,
    borderRadius: 3,
  },
  forget3: {
    color: "#000",
  },
  forget: {
    fontSize: 12,
    fontFamily: PoppinsRegular,
    fontWeight: "400",
  },
  forget2: {
    fontSize: 16,
    fontFamily: PoppinsRegular,
    fontWeight: "500",
    color: "#07504B",
  },

  inputMobileView: {
    borderWidth: 0,
    backgroundColor: "#E6EEEF",
    fontSize: 16,
    fontWeight: "500",
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    padding: 0,
    paddingHorizontal: 0,
    backgroundColor: "#FFF",
  },
  loginButton: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#07504B",
    alignItem: "center",
    justifyContent: "center",
  },
  loginButton2: { backgroundColor: "#1E3A8A" },

  section: {
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    marginTop: 20,
  },
  textStyle: {
    fontFamily: PoppinsRegular,
    fontSize: 16,
    fontWeight: "100",
    color: "#5B5B5B",
  },
  titleTextStyle2: { color: "#CCD9FF", fontSize: 28, fontWeight: "700" },
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
  loginText2: {
    fontFamily: PoppinsRegular,
    fontWeight: "500",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  LoginBox: {
    borderRadius: 20,
  },
  subtitle: { marginTop: 15 },
  subtitle2: { marginTop: 3 },
  login_desc1: {
    borderRadius: 29,
    justifyContent: "flex-end",
    backgroundColor: "#07504B",
  },
  login_desc2: {
    flex: 1,
    padding: helpers.normalize(40),
    justifyContent: "center",
  },
  login_desc22: {
    flex: 1,
    padding: helpers.normalize(0),
    marginHorizontal: helpers.normalize(23),
    justifyContent: "center",
  },
});
export default styles;

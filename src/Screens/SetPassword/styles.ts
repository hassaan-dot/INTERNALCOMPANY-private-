import { StyleSheet } from "react-native";
import { PoppinsRegular } from "../../Resources/fonts";
import helpers from "../../utils/helpers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    padding: 0,
    paddingHorizontal: 0,
    backgroundColor: "#FFF",
  },
  login_desc2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  login_desc22: {
    flex: 1,
    justifyContent: "center",
  },
  container3: {
    width: "65%",
  },
  titleTextStyle: {
    color: "#000",
    fontSize: 42.67,
    fontWeight: "600",
    fontFamily: PoppinsRegular,
  },
  titleTextStyle2: {
    color: "#CCD9FF",
    fontSize: 28,
    fontWeight: "700",
  },
  textStyle: {
    fontFamily: PoppinsRegular,
    fontSize: 16,
    fontWeight: "100",
    color: "#5B5B5B",
  },
  subtitle: { marginTop: 15 },
  subtitle2: { marginTop: 5 },
  logincontainer: {
    marginTop: 20,
  },
  loginButton: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#07504B",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton2: {
    backgroundColor: "#1E3A8A",
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
  inputError: {
    borderColor: "red",
  },
});

export default styles;

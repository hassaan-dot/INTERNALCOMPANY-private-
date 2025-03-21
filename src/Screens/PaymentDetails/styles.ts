import { StyleSheet } from "react-native";
import { PoppinsRegular } from "../../Resources/fonts";

const styles = StyleSheet.create({
  container: { flex: 1 },
  container2: { marginLeft: 25 },
  container3: {
    backgroundColor: "white",
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 20,
    marginTop: 25,
  },
  detailScreenContainer: {
    marginLeft: 0,
    padding: 0,
  },
  textStyle: {
    marginLeft: 0,
    padding: 0,
  },

  LoginBox: { marginHorizontal: 20, marginTop: 0 },

  Text: {
    fontWeight: "500",
    color: "#080808",
    fontSize: 20,
    fontFamily: PoppinsRegular,
  },
});
export default styles;

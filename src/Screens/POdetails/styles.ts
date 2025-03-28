import { StyleSheet } from "react-native";
import { PoppinsRegular } from "../../Resources/fonts";
import helpers from "../../utils/helpers";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  container2: {
    backgroundColor: "white",
    flex: 1,
    marginHorizontal: 20,
    paddingTop: 10,

    marginTop: 25,
  },
  container3: {
    marginLeft: 0,
    paddingVertical: helpers.normalize(20),
  },
  container4: {
    marginLeft: 0,
    padding: 0,
  },
  container5: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  section: {
    marginHorizontal: 10,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  card: { paddingHorizontal: 8, paddingVertical: 12 },
  LoginBox: { marginHorizontal: 20, marginTop: 0 },

  Text: {
    fontWeight: "500",
    color: "#080808",
    fontSize: 20,
    fontFamily: PoppinsRegular,
  },

  container6: {
    marginLeft: 0,
    paddingLeft: 0,
  },
});
export default styles;

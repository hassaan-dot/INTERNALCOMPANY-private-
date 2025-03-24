
const {StyleSheet} = require('react-native');
import { PoppinsRegular } from "../../Resources/fonts";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    backgroundColor: "white",

  },
  searchInput: {
    flex: 1,
    padding: 8,

    color: "#000",
    fontFamily:PoppinsRegular
  },
  icon: {
    marginRight: 8,
  },
});
export default styles;

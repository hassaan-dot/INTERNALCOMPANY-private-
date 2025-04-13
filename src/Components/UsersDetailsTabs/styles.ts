import { StyleSheet } from "react-native";
import { PoppinsRegular } from "../../Resources/fonts";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    flex: 1,
    padding: 10,
    // marginVertical: 10,
    paddingHorizontal: 15,
    marginTop: 5,
    // bottom:-5,
    borderRadius: 10,
    // alignItems: "center",
    // justifyContent: "space-around",
  },
  tab: {
    // flex: 1,
    // alignItems: "center",
    paddingBottom: 5,
    marginRight: 15,
  },
  activeTab: {},
  text: {
    fontSize: 22,
    fontWeight: "100",
    fontFamily: PoppinsRegular,
    color: "#333",
  },
  activeText: {
    fontWeight: "200",
    color: "#000",
  },
  underline: {
    width: "100%",
    height: 2,
    backgroundColor: "#000",
    position: "absolute",
    bottom: 0,
  },
});

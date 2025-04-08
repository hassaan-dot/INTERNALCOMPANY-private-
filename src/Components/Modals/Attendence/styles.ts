import { StyleSheet } from "react-native";
import helpers from "../../../utils/helpers";
import { PoppinsRegular } from "../../../Resources/fonts";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 20,
    width: "33%",
    // flex:1, `
    // alignItems: "center",
    // justifyContent:'center'
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: PoppinsRegular,
  },
  input: {
    // width: "100%",
    height: helpers.hp(23),
    borderWidth: 1,
    // alignSelf:'center',
    justifyContent: "center",
    borderColor: "#ccc",
    // textAlign:'center',
    borderRadius: 5,
    padding: 10,
    // minHeight: 80,
    paddingTop: helpers.normalize(37.5),
    fontFamily: PoppinsRegular,

    // textAlignVertical:'center',
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 5,
  },
  chipSelected: {
    backgroundColor: "#1E4D42",
  },
  chipUnselected: {
    // backgroundColor: "#E0E0E0",
    backgroundColor: "#1E4D42",
  },
  chipText: {
    color: "white",
    fontWeight: "200",
    fontFamily: PoppinsRegular,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: "#1E4D42",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  sendText: {
    color: "white",
    fontSize: 16,
    fontWeight: "200",
    fontFamily: PoppinsRegular,
  },
});

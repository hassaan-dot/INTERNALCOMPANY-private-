import { StyleSheet } from "react-native";
import helpers from "../../../utils/helpers";
import { PoppinsRegular } from "../../../Resources/fonts";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal:helpers.normalize(200),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalIcon: { width: 60, height: 60 },
  modalContainer: {
    width: "30%",
    // flex:1,
    // alignSelf:'center',

    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: helpers.normalize(20),
    marginVertical: 10,
    // flex:1
    // flexDirection:'row',
  },
  fontSize: { fontSize: 14 },
  icon: {
    backgroundColor: "#0F3D3E",
    borderRadius: 50,
  },
  inputNote: {
    // width:helpers.wp(100),
    padding: 9,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 5,
    height: helpers.hp(15),
  },
  title: {
    fontSize: 18,
    fontFamily: PoppinsRegular,
    fontWeight: "500",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
    marginBottom: 20,
  },
  input: {
    // width: "100%",
    // width:helpers.wp(30),
    // flex:1,
    // padding: 9,
    paddingHorizontal: 9,
    // paddingTop:10,
    lineHeight: 22,
    // textAlignVertical:'center',
    borderWidth: 1,
    // borderColor: "#ddd",
    borderRadius: 5,
    // marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    // width: "100%",
    // flex:1,
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    borderRadius: 5,
    marginRight: 5,
  },
  cancelText: {
    color: "black",
  },
  addButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#0F3D3E",
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 5,
  },
  addText: {
    color: "white",
    // paddingHorizontal:50,
  },
  dropdownBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  dropdownInput: {
    fontSize: 16,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownBadge: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  dropdownBadgeText: {
    fontSize: 12,
  },
});

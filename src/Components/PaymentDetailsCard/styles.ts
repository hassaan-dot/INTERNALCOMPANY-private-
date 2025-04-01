import { StyleSheet } from "react-native";
import helpers from "../../utils/helpers";
import { PoppinsRegular } from "../../Resources/fonts";
export const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  customStyle: {
    flex: 0.333,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    //   margin: 25,
    marginHorizontal: 17,
    marginVertical: 22,
    // marginTop: 25,
    // margin: 10,

    //   marginBottom: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    // padding: 16,
    // paddingVertical: 30,
    borderRadius: 8,
    backgroundColor: "#fff",

    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3, // Android shadow
  },

  profileSection: {
    // flex: 1,
    // backgroundColor:'blue',
    // alignItems: "center",
    // justifyContent:'space-between',
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 15,

    width: helpers.wp(20),
    borderRadius: 8,
    // paddingHorizontal:40,
    borderColor: "#E8E8E8",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: "black",
    // marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  detailsSection: {
    // flex: 2,
    flex: 1,
    width: helpers.wp(30),
    justifyContent: "space-between",
    // height:80,
    // paddingLeft: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginLeft: 15,
    padding: 20,
    // paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    //   marginBottom: 12,
    paddingLeft: 20,
    // paddingVertical: 14,
    color: "#080808",
    fontFamily: PoppinsRegular,
  },
  detailsItem: {
    // flexDirection: 'column',
    // alignItems: "center",
    // backgroundColor:"pink",
    marginRight: 5,
    // flexDirection: "row",
    // marginBottom: 4,
    flex: 0.333,
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6B6B6B",
    fontFamily: PoppinsRegular,
  },
  link: {
    fontWeight: "400",
    marginTop: 5,
    fontFamily: PoppinsRegular,

    fontSize: 14,
    color: "#000000",
  },
});

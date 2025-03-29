import { StyleSheet } from "react-native";
import helpers from "../../utils/helpers";
import { PoppinsRegular } from "../../Resources/fonts";

export const styles = StyleSheet.create({
  container: {
    //   padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  profileView: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },

  customStyle: {
    flex: 0.333,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 15,
    marginRight: 5,
  },
  avatar1: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    // flex: 0.5,
  },
  card: {
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 15,
    width: helpers.wp(20),
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "500",
    // marginBottom: 10,
    paddingLeft: 20,
    paddingVertical: 12,
    color: "#080808",
    fontFamily: PoppinsRegular,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: "black",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    fontFamily: PoppinsRegular,
  },
  detailsSection: {
    flex: 1,
    // width: helpers.wp(30),
    justifyContent: "space-between",

    borderColor: "#E8E8E8",
    borderWidth: 1,
    // marginLeft: 15,
    // paddingBottom: helpers.normalize(20),
    // paddingHorizontal: 20,
    // paddingTop:15,
    paddingVertical: 0,
    borderRadius: 10,
  },

  detailsItem: {
    marginRight: 5,
    marginBottom: 4,
    flex: 0.333,
  },
  label: {
    fontSize: 14,
    color: "#080808",
  },
  link: {
    fontWeight: "500",
    marginTop: 6,

    fontSize: 14,
    color: "#1E38A8",
  },
});

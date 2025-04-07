import { StyleSheet } from "react-native";
import helpers from "../../utils/helpers";

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  customStyle: {
    flex: 0.333,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  profileSection: {
    // flex: 1,
    // backgroundColor:'blue',
    // alignItems: "center",
    // justifyContent:'space-between',
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 1,
    padding: 15,
    minWidth: 200,
    minHeight: 150,
    // paddingVertical: 75,
    // width: helpers.wp(20),
    flex: 1,
    borderRadius: 8,
    // paddingHorizontal:helpers.normalize(60),
    // paddingHorizontal:40,
    borderColor: "#E8E8E8",
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
    padding: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    flex: 0.333,
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
  },
  link: {
    fontWeight: "300",

    fontSize: 14,
    color: "#1E38A8",
  },
});

import { StyleSheet } from "react-native";
import helpers from "../../utils/helpers";
import { RobotoMedium, RobotoRegular } from "../../Resources/fonts";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 10,
    
    height: helpers.hp(65),
  },
  card: {
    backgroundColor: "#fff",  
    padding: 15,
    paddingHorizontal:0,
    borderRadius: 16,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    width: helpers.wp(37),
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: RobotoMedium,
    fontWeight: "600",
    padding: 10,
    paddingHorizontal:20,
    paddingTop: 5,
    color:'#1B2A39'
    // marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    // paddingVertical: 10,
  },
  line: { flex:1, marginTop: 10 },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 15,
    marginRight: 5,
  },
  name: {
    fontWeight: "400",
    fontFamily:RobotoRegular
  },
  actionText: {
    color: "#8D6E63",
    fontFamily:RobotoRegular

  },

  code: {
    color: "#5C6BC0",
    fontFamily:RobotoRegular

  },
  message: {
    color: "#8D6E63",
    fontFamily:RobotoRegular

  },
  newsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight:12,
  },
  addButton: {
    backgroundColor: "#07504B",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  customView: {
    flex: 0.25,
    alignItems: "center",
  },
  customView2: {
    flex: 0.5,
    alignItems: "center",
  },
  customView3: {
    flex: 0.3,
    alignItems: "center",
  },

  profileView: { flexDirection: "row", alignItems: "center", flex: 0.25 },
});

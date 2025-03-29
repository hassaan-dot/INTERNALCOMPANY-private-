import { StyleSheet } from "react-native";
import { MontserratRegular, PoppinsRegular } from "../../Resources/fonts";
import helpers from "../../utils/helpers";
export const styles = StyleSheet.create({
  container: {
    //   backgroundColor: "#fff",
    //   margin: ,
    //   padding: 15,
    padding: 10,
    marginRight: helpers.normalize(20),
    backgroundColor: "#fff",
    flex: 1,
    // width: helpers.wp(47),
    // left: helpers.normalize(-14),
    //  flexDirection:"row",

    //   marginHorizontal: 30,
  },
  inputContainer: {
    padding: 13,
    borderRadius: 8,
    marginLeft: 5,
    // paddingHorizontal: 15,
    backgroundColor: "#F9F9F9",
    flex: 1,
  },
  label: {
    color: "#2C2C2D",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: PoppinsRegular,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 12,
    // padding: 15,
    // margin:15,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  text: {
    color: "#2C2C2D",
    // flex:1,
    fontFamily: MontserratRegular,
    fontSize: 16,
    fontWeight: "400",
  },
  dateContainer: {
    // padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    // flex:1,
    flexDirection: "row",
    paddingHorizontal: 15,
    backgroundColor: "#F8F8F8",
    paddingVertical: 10,
    // marginHorizontal: 10,
  },
  dateText: {
    color: "#2C2C2B",
    fontWeight: "100",
    fontSize: 18,
    fontFamily: PoppinsRegular,
  },
  descriptionContainer: {
    marginTop: 0,
    marginHorizontal: 10,
  },
  inputField: {
    // height: helpers.hp(0),
    padding: 15,
    paddingBottom: helpers.normalize(50),
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    fontFamily: PoppinsRegular,
    fontWeight: "500",
    fontSize: 14,
    // textAlignVertical:'top'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
    marginLeft: 5,
    fontFamily: MontserratRegular,
  },
  card: {
    marginBottom: 12,
  },
  addButton: {
    marginBottom: 16,
  },
  date: {
    color: "#2C2C2B",
    fontWeight: "100",
    fontSize: 14,
    fontFamily: PoppinsRegular,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    marginRight: 15,
    marginTop: 5,
    backgroundColor: "#EBEBEB",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  customText: {
    fontFamily: MontserratRegular,
    fontWeight: "100",
    fontSize: 16,
  },
  custom1: { backgroundColor: "#fff", flex: 1, margin: 25, marginTop: 15 },
  custom2: { flexDirection: "row" },
  custom3: { marginHorizontal: 25 },
  custom4: { flex: 1, backgroundColor: "#F5F6FA" },
  custom5: {
    padding: 20,
    // paddingBottom:20,

    paddingRight: helpers.normalize(40),
    // width:'100%',
    // flex:1,
    backgroundColor: "#fff",
    // width: helpers.wp(22),

    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)", // Web shadow
    height: helpers.hp(35),
  },
  custom6: { margin: 5, marginTop: 20, marginRight: helpers.normalize(80) },
  custom7: { marginHorizontal: 30, margin: 10 },
  custom8: {
    padding: 20,
    backgroundColor: "grey",
    borderRadius: 8,
    marginRight: 20,
  },
  custom9: { flexDirection: "row", alignItems: "center" },
});

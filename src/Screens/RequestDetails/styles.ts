import { StyleSheet } from "react-native";
import { MontserratRegular, PoppinsRegular } from "../../Resources/fonts";
import helpers from "../../utils/helpers";
export const styles = StyleSheet.create({
  container: {
    //   backgroundColor: "#fff",
    //   margin: ,
    //   padding: 15,
    padding: 10,
    width: helpers.wp(47),
    left: helpers.normalize(-14),
    //  flexDirection:"row",

    //   marginHorizontal: 30,
  },
  inputContainer: {
    padding: 10,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#F8F8F8",
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
    marginBottom: 12,
    padding: 15,
  },
  text: {
    color: "#2C2C2D",
    fontFamily: MontserratRegular,
    fontSize: 16,
    fontWeight: "400",
  },
  dateContainer: {
    padding: 10,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#F8F8F8",
    marginHorizontal: 10,
  },
  dateText: {
    color: "#2C2C2D",
    fontWeight: "400",
    fontSize: 18,
    fontFamily: MontserratRegular,
  },
  descriptionContainer: {
    marginTop: 0,
    marginHorizontal: 10,
  },
  inputField: {
    // height: helpers.hp(0),
    padding: 15,
    paddingBottom:helpers.normalize(70),
    backgroundColor: "#f4f4f3",
    borderRadius: 8,
    fontFamily: PoppinsRegular,
    fontWeight: "600",
    textAlignVertical:'top'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
    fontFamily: MontserratRegular,
  },
  card: {
    marginBottom: 12,
  },
  addButton: {
    marginBottom: 16,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    marginRight: 15,
    marginTop: 5,
    backgroundColor: "grey",
  },
  customText:{
    fontFamily: MontserratRegular,
    fontWeight: "100",
    fontSize: 16,
  },
  custom1: { backgroundColor: "#fff", flex: 1, margin: 25, marginTop: 15 },
  custom2: { flexDirection: "row", justifyContent: "space-around" },
  custom3:{ marginHorizontal: 25 },
  custom4:{ flex: 1 },
  custom5:{
    padding: 20,
    backgroundColor: "#fff",
    width: helpers.wp(22),

    boxShadow: "0px 0px 5px 5px rgba(0, 0, 0, 0.1)", 
        height: helpers.hp(35),
  },
  custom6:{ margin: 5, marginTop: 20 },
  custom7:{ marginHorizontal: 30, margin: 10 },
  custom8:{
    padding: 20,
    backgroundColor: "grey",
    borderRadius: 8,
    marginRight: 20,
  },custom9:{ flexDirection: "row", alignItems: "center" }
,});

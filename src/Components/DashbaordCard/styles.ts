import { Dimensions, Platform, StyleSheet } from "react-native";
import helpers from "../../utils/helpers";
import { RobotoMedium, RobotoRegular } from "../../Resources/fonts";
const { width, height } = Dimensions.get("window");
const isMobileView = Platform.OS === "ios";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: isMobileView ? helpers.hp(41) : helpers.hp(65),
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  newsHeader2: { justifyContent: "center" },
  card3: { borderWidth: 5, borderColor: "#CCD9FF" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    paddingHorizontal: 15,
    borderRadius: 16,
    flex: 1,
    elevation: 3,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  card2: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: isMobileView ? 0 : 15,
    borderRadius: 16.38,
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: RobotoMedium,
    fontWeight: "600",
    padding: 10,
    paddingHorizontal: 20,
    paddingTop: 5,
    color: "#1B2A39",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginBottom: 20,
  },
  line: { flex: 1, marginTop: 10 },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 15,
    marginRight: 5,
  },
  name: {
    fontWeight: "400",
    fontFamily: RobotoRegular,
    marginHorizontal: 15,
    // textOverflow: "no-wrap",

    // textWrap: "no-wrap",
  },
  actionText: {
    color: "#8D6E63",
    fontFamily: RobotoRegular,
    flex: 1,
  },

  code: {
    color: "#5C6BC0",
    fontFamily: RobotoRegular,
  },
  message: {
    color: "#8D6E63",
    fontFamily: RobotoRegular,
  },
  newsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
    paddingRight: 12,
  },
  addButton: {
    backgroundColor: "#07504B",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
  },
  addButton1: {
    backgroundColor: "#3962ff",
    paddingHorizontal: 30,
    borderRadius: 5,

    padding: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    flex: 0.8,
    // alignItems: "center",
  },
  customView3: {
    flex: 0.1,
    alignItems: "center",
  },

  profileView: { flexDirection: "row", alignItems: "center", flex: 0.355 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 10,
    alignItems: "center",
    width: 280,
    maxWidth: "100%",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  modalCancel: {
    color: "#999",
  },
  modalConfirm: {
    color: "#f44336",
    fontWeight: "bold",
  },
});

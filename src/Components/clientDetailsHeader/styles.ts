import { I18nManager, StyleSheet } from "react-native";
import { PoppinsRegular } from "../../Resources/fonts";
import helpers from "../../utils/helpers";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  customStyle: {
    flex: 0.333,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    padding: 15,
    paddingVertical: 30,
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 15,
    width: "25%",
    paddingVertical: 26,
    borderRadius: 8,
    marginRight: 20,
    borderColor: "#E8E8E8",
  },
  profileImage: {
    width: 77,
    height: 77,
    borderRadius: 80 / 2,
    backgroundColor: "black",
    marginBottom: 8,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: PoppinsRegular,
  },
  detailsSection: {
    flex: 1,
    justifyContent: "space-between",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    padding: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
    fontFamily: PoppinsRegular,
  },
  detailsContent: {
    marginTop: 10,
  },
  detailsRow: {
    justifyContent: "space-between",
    marginBottom: 6,
  },
  detailsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginRight: 32,
  },
  label: {
    fontSize: 17,
    fontWeight: "400",
    fontFamily: PoppinsRegular,
    color: "#2C2C2D",
  },
  link: {
    fontWeight: "100",
    fontFamily: PoppinsRegular,
    fontSize: 14,
    marginLeft: 5,
    marginRight: 5,
    color: "#07504B",
  },
});

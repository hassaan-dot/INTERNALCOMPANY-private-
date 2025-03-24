import { StyleSheet } from "react-native";
import { PoppinsRegular } from "../../Resources/fonts";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  headerRow: {
    flexDirection: "row",
    paddingVertical: 13,
    backgroundColor: "#FFF",
    padding: 3,

    borderRadius: 10,

    marginBottom: 5,
  },
  image: { width: 15, height: 15, marginHorizontal: 5 },
  headerText: {
    color: "#A9A9A9",
    flexDirection: "column",
    alignItems: "flex-start",
    fontFamily: PoppinsRegular,
    paddingRight: 20,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    padding: 5,
    borderBottomWidth: 0.33,
    borderColor: "#ddd",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cell: {
    flex: 1,
    fontFamily: PoppinsRegular,
    paddingRight: 20,
  },
  activePageButton: {
    backgroundColor: "#07504B",
    borderRadius: 8,
    padding: 4,
    paddingVertical: 1,
  },
  actionIcons: {
    flexDirection: "row",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  pageButton: {
    marginHorizontal: 4,
    fontFamily: PoppinsRegular,
    fontSize: 12,
    padding: 2,
    fontWeight: "400",
    paddingVertical: 3,
    color: "#1C1C1C",
  },
  activePage: {
    color: "white",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: PoppinsRegular,
  },
  customDesign: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  customHeader: { flexDirection: "row", alignItems: "center", flex: 1 },
});

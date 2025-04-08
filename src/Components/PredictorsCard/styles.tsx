import { PoppinsRegular } from "@/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginRight: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "#999",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: PoppinsRegular,
  },
  value: {
    fontSize: 28,
    fontWeight: "300",
    color: "#000",
    fontFamily: PoppinsRegular,
  },
  value2: {
    fontSize: 15,
    fontWeight: "500",
    color: "#29292B",
    fontFamily: PoppinsRegular,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  increaseContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 5,
    borderRadius: 10,
  },
  increaseText: {
    fontSize: 12,
    fontWeight: "200",
    marginLeft: 5,
    fontFamily: PoppinsRegular,
  },
  increaseText2: {
    color: "#333333",
    fontSize: 8,
    fontWeight: "400",
    marginLeft: 5,
    fontFamily: PoppinsRegular,
  },
});

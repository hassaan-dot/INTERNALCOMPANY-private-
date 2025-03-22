import { StyleSheet } from "react-native";
import { PoppinsRegular } from "../../Resources/fonts";
export const styles = StyleSheet.create({
  container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container1: { flex: 1, paddingHorizontal: 30,backgroundColor:"#F5F6FA" },
  container3: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#07504B",
    borderWidth: 1,
    borderRadius: 6,
  },
  textStyle1: {
    color: "#07504B",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: PoppinsRegular,
  },
});

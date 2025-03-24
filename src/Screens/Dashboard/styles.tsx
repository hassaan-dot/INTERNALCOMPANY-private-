import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,

    backgroundColor: Platform.OS == "ios" ? "#fff" : "#F5F6FA",
    paddingHorizontal: Platform.OS == "ios" ? 20 : 40,
  },
  container2: {
    flexDirection: Platform.OS == "ios" ? "column" : "row",
  },
  container3: {
    marginTop: 13,
  },
  container4: {
    marginBottom: 6,
  },
  container5: { flexDirection: "row", flex: 1 },
  container6: {
    marginRight: Platform.OS === "ios" ? 10 : 20,
    marginHorizontal: Platform.OS === "ios" ? 0 : "",
    paddingHorizontal: Platform.OS === "ios" ? 5 : 10,
  },

});

import { StyleSheet } from "react-native";
import { PoppinsRegular } from "@/constants/fonts";
import helpers from "@/src/utils/helpers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexWrap:'wrap',
    flexDirection: "row",
    padding: 30,

    paddingHorizontal: 25,
    backgroundColor: "#FFF",
  },
  loginButton: {
    borderRadius: 10,
    padding: 15,
    flex: 1,
    // width: helpers.wp(32),
    backgroundColor: "#07504B",
    alignItem: "center",
    justifyContent: "center",
  },

  section: {
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "space-between",
    marginVertical: 15,
    marginTop: 25,
  },

  textStyle: {
    fontFamily: PoppinsRegular,
    fontSize: 16,
    fontWeight: "100",
    color: "#5B5B5B",
  },

  titleTextStyle: {
    color: "#000",
    fontSize: 42.67,
    fontWeight: "600",
    fontFamily: PoppinsRegular,
  },
  loginText: {
    fontFamily: PoppinsRegular,
    fontweigth: "400",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  LoginBox: {
    borderRadius: 20,
  },
  login_desc1: {
    // flex: 1,
    // flex:1,
    // paddingHorizontal: 25,
    borderRadius: 29,
    // marginRight:5,
    // width:helpers.wp(50),
    justifyContent: "flex-end",
    backgroundColor: "#07504B",
  },
  login_desc2: {
    flex: 1,
    // padding: 100,
    padding: helpers.normalize(40),
    // paddingHorizontal:helpers.normalize(140),
    justifyContent: "center",
    // marginHorizontal:100
  },
});
export default styles;
// import { StyleSheet, Dimensions } from "react-native";

// const { width, height } = Dimensions.get("window");

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: "center",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: width * 0.05,
//     paddingTop: height * 0.05,
//   },
//   login_desc1: {
//     alignItems: "center",
//     marginBottom: height * 0.02,
//   },
//   login_desc2: {
//     paddingHorizontal: width * 0.05,
//   },
//   section: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: height * 0.015,
//   },
//   loginButton: {
//     backgroundColor: "#007AFF",
//     paddingVertical: height * 0.015,
//     borderRadius: width * 0.03,
//     alignItems: "center",
//   },
//   loginText: {
//     color: "#fff",
//     fontSize: width * 0.045,
//     fontWeight: "bold",
//   },
// });

// export default styles;

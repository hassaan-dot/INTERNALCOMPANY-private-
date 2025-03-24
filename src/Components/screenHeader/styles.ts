import { StyleSheet } from "react-native";
import { PoppinsBold, PoppinsRegular, PoppinsSemiBold } from "../../Resources/fonts";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginBottom:10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    marginTop: 25,
    // paddingHorizontal: 25,
    // backgroundColor:'red',
  },
  TitleDesign:{
    fontSize:32,
    fontWeight:'800',
    color:'#000000'

  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10, // Adds spacing between buttons
  },
  title: {
    fontSize: 24,
    fontWeight:   'bold',
    // marginLeft:5,
    fontFamily:PoppinsSemiBold

  },
  createButton: {
    padding: 8,
    paddingHorizontal:20,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth:1,
    borderColor:'#07504B',
    flexDirection:'row',
    marginRight:8,
    alignItems:'center'
  },
  createText: {
    color: "#07504B",
    fontWeight: "500",
    fontSize:15,
    fontFamily:PoppinsRegular
  },
    // container: {
    //   flexDirection:'column',
    //   // alignItems: "center",
    //   // justifyContent: "space-between",
    //   // paddingHorizontal: 16,
    //   // backgroundColor: "#fff",
    //   // paddingVertical: 10,
    // },
    // title: {
    //   fontSize: 18,
    //   fontWeight: "600",
    //   color: "#333",
    // },
    // lineContainer: {
    //   height: 40,
    //   width: 2,
    // },
    // createButton: {
    //   borderWidth: 1,
    //   borderColor: "#007bff",
    //   paddingVertical: 6,
    //   paddingHorizontal: 12,
    //   // borderRadius: 8,
    // },
    // createText: {
    //   color: "#007bff",
    //   fontSize: 14,
    // },
  });
  export default styles
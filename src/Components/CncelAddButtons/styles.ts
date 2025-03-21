import { StyleSheet } from "react-native";
import helpers from "../../utils/helpers";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        paddingRight: helpers.normalize(80),
      },
      row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
      },
      inputContainer: { flex: 1 },
      label: { fontSize: 14, fontWeight: "600", marginBottom: 5 },
      input: {
        borderColor: "#ddd",
        borderWidth: 1,
        // borderColor: "#ccc",
        // height:helpers.hp(20),
        minHeight:helpers.normalize(60),
        textAlignVertical:"top",
        // flex:1,
        borderRadius: 5,
        // padding: 10,
        
      },
      input1: {
        width: helpers.wp(30),
        padding: 10,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        marginBottom: 5,
      },
      notes: { height: 80, textAlignVertical: "top" },
      uploadButton: {
        flex: 1,
        padding: 15,
        backgroundColor: "#f5f5f5",
        borderRadius: 5,
        alignItems: "center",
        marginRight: 10,
      },
      buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
      },
      cancelButton: {
        padding: 10,
        // backgroundColor: "#ccc",
        // flex: 1,
        alignItems: "center",
        borderRadius: 8,
        width:helpers.wp(16),
        borderColor:'#D0D5DD',
        borderWidth:1,
    
        marginRight: 10,
      },
      addButton: {
        padding: 10,
        backgroundColor: "#07504B",
        // flex: 1,
        alignItems: "center",
        borderRadius: 8,
        width:helpers.wp(16),
        borderColor:'#D0D5DD',
        borderWidth:1,
    
        marginRight: 10,
      },
      buttonTextCancel: { color: "#000", fontSize: 16, fontWeight: "600" },
    
      buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
   
    
//     buttonRow: {
//       flexDirection: "row",
//       justifyContent: "flex-end",
//       marginTop: 20,
//       paddingRight: 30,
//     },
//     button: {
//       padding: 10,
//       alignItems: "center",
//       borderRadius: 8,
//       width: helpers,
//       borderWidth: 1,
//       marginRight: 10,
//     },
//     cancelButton: {
//       borderColor: "#D0D5DD",
//       borderWidth: 1,
//       backgroundColor: "transparent",
//     },
//     addButton: {
//       backgroundColor: "#07504B",
//       borderColor: "#D0D5DD",
//     },
//     buttonText: {
//       color: "#fff",
//       fontSize: 16,
//       fontWeight: "600",
//     },
//     buttonTextCancel: {
//       color: "#000",
//     },
  });
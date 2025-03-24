import { PoppinsRegular } from "@/constants/fonts";
import helpers from "@/src/utils/helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 15,paddingTop:helpers.normalize(65)},
    container2:{marginTop:15},
    container3:{flexDirection:'row',alignItems:'center',marginBottom:20},
    container4:{borderBottomWidth: 1, borderColor: 'rgba(133, 133, 133, 0.1)'},
    header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#a7a7f4" },
    profileCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#F3F6FF", padding: 15, borderRadius: 12, marginBottom: 20,paddingVertical:20 },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
    name: { fontSize: 16, fontWeight: "700", color: "#CCD9FF",marginBottom:5 },
    phone: { fontSize: 14, color: "#666",marginBottom:5 },
    email: { fontSize: 14, color: "#888" },
    settingsHeader: { fontSize: 16, fontWeight: "700", color: "#CCD9FF", marginBottom: 22,marginTop:8 },
    settingsItem: { flexDirection: "row", alignItems: "center",justifyContent:'space-between', padding: 15,paddingHorizontal:4 },
    icon: { fontSize: 18, marginRight: 10 },
    label: { fontSize: 14,fontWeight:'500',fontFamily:PoppinsRegular },
    arrow: { fontSize: 16, color: "#bbb" },
    image:{width:20,height:20,marginRight:18}
  });
  
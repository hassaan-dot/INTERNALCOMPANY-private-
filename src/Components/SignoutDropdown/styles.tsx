import { StyleSheet } from "react-native";
import { PoppinsRegular, PoppinsSemiBold } from "@/constants/fonts";

export const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    marginRight: 20,
    marginTop: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdown: {
    position: "absolute",
    top: 60,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    minWidth: 200,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  usernameText: {
    fontSize: 16,
    fontFamily: PoppinsSemiBold,
    color: "#333",
    marginBottom: 0,
    textAlign: "center",
  },
  userMetaText: {
    fontSize: 13,
    fontFamily: PoppinsRegular,
    color: '#888',
    textAlign: 'center',
    marginTop: 2,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    marginRight: 12,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 15,
    fontFamily: PoppinsRegular,
    color: "#333",
  },
  signOutText: {
    fontSize: 15,
    fontFamily: PoppinsRegular,
    color: "#f44336",
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  }
});

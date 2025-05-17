import { I18nManager, StyleSheet } from "react-native";
import helpers from "../../utils/helpers";
import { PoppinsRegular, PoppinsSemiBold } from "../../Resources/fonts";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  avatar: {
    width: 27,
    height: 27,
    borderRadius: 15,
    marginStart: helpers.normalize(10),
  },

  actionButtonsContainer: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    gap: 16,
  },

  clockButtonIcon: {
    paddingHorizontal: helpers.normalize(4),
    paddingVertical: helpers.normalize(4),
  },

  signOutButton: {
    marginStart: helpers.normalize(8),
  },

  signOutText: {
    fontSize: helpers.normalize(13),
    fontFamily: PoppinsSemiBold,
    color: "#f44336",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 10,
    alignItems: "center",
    width: 280,
  },

  modalText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
    fontFamily: PoppinsRegular,
    color: "#333",
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },

  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  modalCancel: {
    color: "#999",
    fontFamily: PoppinsRegular,
  },

  modalConfirm: {
    color: "#4CAF50",
    fontWeight: "bold",
    fontFamily: PoppinsSemiBold,
  },

  timerText: {
    fontSize: 12,
    color: "#333",
    marginTop: 4,
    textAlign: "center",
  },
});

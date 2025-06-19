import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info";

interface ShowToastParams {
  type: ToastType;
  message: string;
  subtitle?: string;
}

export const showToast = ({ type, message, subtitle }: ShowToastParams) => {
  Toast.show({
    type,
    text1: message,
    text2: subtitle,
    position: "top",
    visibilityTime: 1999,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

export const toastSuccess = (message: string, subtitle?: string) => {
  showToast({ type: "success", message, subtitle });
};

export const toastError = (message: string, subtitle?: string) => {
  showToast({ type: "error", message, subtitle });
};

export const toastInfo = (message: string, subtitle?: string) => {
  showToast({ type: "info", message, subtitle });
};

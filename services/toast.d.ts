declare module "react-native-toast-message" {
  interface ToastConfig {
    success(props: any): JSX.Element;
    error(props: any): JSX.Element;
    info(props: any): JSX.Element;
  }

  export interface ToastShowParams {
    type: string;
    position?: "top" | "bottom";
    text1?: string;
    text2?: string;
    visibilityTime?: number;
    autoHide?: boolean;
    topOffset?: number;
    bottomOffset?: number;
  }

  export function show(params: ToastShowParams): void;
  export function hide(): void;

  const Toast: {
    show: typeof show;
    hide: typeof hide;
  };

  export default Toast;
}

import Sidebar from "@/components/drawer/sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";
import Bottomtabs from "../../components/Bottom/Bottom";
import { Platform } from "react-native";
export default function AuthLayout() {
  const ismobileView = Platform.OS == "ios";
  const { token } = useAuthStore();
  if (token) return <Redirect href={"/(auth)/login"} />;
  if (!ismobileView) return <Sidebar></Sidebar>;
  if (!ismobileView) {
    return <Redirect href={"/(app)/dashboard"} />;
  }
  if (ismobileView) {
    return <Redirect href={"/(tabs)/dashboard"} />;
  }
}

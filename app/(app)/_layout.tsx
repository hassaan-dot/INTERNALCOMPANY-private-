import Sidebar from "@/components/drawer/sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";

export default function AuthLayout() {
  const { token } = useAuthStore();
  if (!token) return <Redirect href={"/(auth)/login"} />;
  return <Sidebar />;
}

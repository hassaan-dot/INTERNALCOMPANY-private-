import Sidebar from "@/components/drawer/sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";
import Bottomtabs from '../../components/Bottom/Bottom'
export default function AuthLayout() {
  const { token } = useAuthStore();
  if (token) return <Redirect href={"/(auth)/login"} />;
  return <Bottomtabs />
}

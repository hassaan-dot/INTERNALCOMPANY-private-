import Sidebar from "@/components/drawer/sidebar";
import LocalStorage from "@/services/local-storage";
import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";

export default function AuthLayout() {
  const saveUser = async () => {
    await LocalStorage.get("user");
    const app = LocalStorage.get("user"); // if you need the result
    // Or if you don't need the result:
    // await LocalStorage.save("user", data.user);
    console.log("app", app);
  };

  saveUser();
  const { token } = useAuthStore();
  if (!token) return <Redirect href={"/(auth)/login"} />;
  return <Sidebar />;
}

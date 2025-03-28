import { useAuthStore } from "@/store/useAuthStore";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { token, user } = useAuthStore();
  if (token) return <Redirect href={"/(app)/dashboard"} />;

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
}

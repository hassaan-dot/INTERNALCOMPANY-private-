import { ROLE } from "@/constants/role";
import { useAuthStore } from "@/store/useAuthStore";
import { Stack, Unmatched } from "expo-router";

export default function UserManagementLayout() {
  const { user } = useAuthStore();
  if (user?.role?.name === ROLE.EMPLOYEE) return <Unmatched />;
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="client-details" options={{ headerShown: false }} />
    </Stack>
  );
}

import { Stack, Unmatched } from "expo-router";

import { useAuthStore } from "@/store/useAuthStore";
import { ROLE } from "@/constants/role";

export default function UserManagementLayout() {
  const { user } = useAuthStore();
  if (user?.role?.name === ROLE.EMPLOYEE) return <Unmatched />;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="user-details" options={{ headerShown: false }} />
    </Stack>
  );
}

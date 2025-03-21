import { Stack } from "expo-router";

export default function UserManagementLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="user-deatils" options={{ headerShown: false }} />
    </Stack>
  );
}

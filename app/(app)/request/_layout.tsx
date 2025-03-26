import { Stack } from "expo-router";

export default function UserManagementLayout() {
  return (
    <Stack initialRouteName="request-details">
     <Stack.Screen name="request-details" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />

    </Stack>
  );
}

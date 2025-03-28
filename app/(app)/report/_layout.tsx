import { Stack } from "expo-router";

export default function reportlayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="payment-details" options={{ headerShown: false }} /> */}
    </Stack>
  );
}

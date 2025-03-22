import { Stack } from "expo-router";

export default function paymentFunction() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="payment-details" options={{ headerShown: false }} />
    </Stack>
  );
}

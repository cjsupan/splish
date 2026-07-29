import { Stack } from "expo-router";

export default function OnboardingCustomerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="onboarding-customer" />
    </Stack>
  );
}

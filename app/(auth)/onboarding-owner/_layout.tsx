import { Stack } from "expo-router";

export default function OnboardingOwnerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="onboarding-owner" />
    </Stack>
  );
}

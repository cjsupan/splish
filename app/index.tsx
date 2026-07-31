import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export default function Index() {
  const { session, profile, loading } = useAuthStore();
  console.log("profile");
  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!profile?.onboarding_complete) {
    return <Redirect href="/(auth)/onboarding" />;
  } else if (profile && profile.role && profile.onboarding_complete) {
    if (profile.role === "owner") {
      return <Redirect href="/(owner)" />;
    } else if (profile.role === "customer") {
      return <Redirect href="/(customer)" />;
    } else {
      return <Redirect href="/(auth)/onboarding" />;
    }
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return <Redirect href="/(auth)/onboarding" />;
}

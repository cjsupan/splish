import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export default function Index() {
  const { session, profile, loading } = useAuthStore();
  console.log("session: ", session);
  console.log("profile: ", profile);
  console.log("loading: ", loading);
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!profile || !profile.onboarding_complete) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  if (profile.role === "owner") {
    return <Redirect href="/(owner)" />;
  }

  return <Redirect href="/(customer)/(home)" />;
}

import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DoneStep() {
  const router = useRouter();
  const { session, profile } = useAuthStore();

  const roleSpecificText = {
    customer: {
      title: "You're All Set!",
      message: "Your profile has been created successfully. Welcome aboard!",
      button: "Go to Dashboard",
    },
    owner: {
      title: "Shop Setup Complete!",
      message: "Your shop profile is ready to serve customers.",
      button: "Go to My Shop",
    },
  };

  const navigateToNext = () => {
    console.log("done", profile?.role, "session: ", session?.user?.role);
    if (profile?.role === "customer") {
      router.replace("/(customer)");
    } else if (profile?.role === "owner") {
      router.replace("/(owner)");
    }
  };

  const text = roleSpecificText[profile?.role ?? "customer"];

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-surface">
      <View className="flex-1 gap-8 px-6 pb-4">
        <View className="flex-1 items-center justify-center">
          <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <Text className="text-3xl">🎉</Text>
          </View>

          <Text className="mb-2 text-center text-2xl font-bold text-gray-900">
            {text.title}
          </Text>
          <Text className="mb-8 px-4 text-center text-gray-500">
            {text.message}
          </Text>
        </View>

        <Pressable
          onPress={navigateToNext}
          className="w-full items-center rounded-xl bg-primary px-8 py-4"
        >
          <Text className="text-base font-bold text-white">{text.button}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

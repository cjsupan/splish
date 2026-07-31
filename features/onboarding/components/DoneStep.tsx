import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export default function DoneStep() {
  const router = useRouter();
  const profile = useAuthStore((state) => state.profile);

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

  const text = roleSpecificText[profile?.role ?? "customer"];

  return (
    <View className="flex-1 items-center justify-center py-10">
      <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <Text className="text-3xl">🎉</Text>
      </View>

      <Text className="mb-2 text-center text-2xl font-bold text-gray-900">
        {text.title}
      </Text>
      <Text className="mb-8 px-4 text-center text-gray-500">
        {text.message}
      </Text>

      <Pressable
        onPress={() => {}}
        className="w-full items-center rounded-xl bg-primary px-8 py-4"
      >
        <Text className="text-base font-bold text-white">{text.button}</Text>
      </Pressable>
    </View>
  );
}

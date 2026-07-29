import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function DoneStep() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center py-10">
      <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <Text className="text-3xl">🎉</Text>
      </View>

      <Text className="mb-2 text-center text-2xl font-bold text-gray-900">
        You're All Set!
      </Text>
      <Text className="mb-8 px-4 text-center text-gray-500">
        Your profile has been created successfully. Welcome aboard!
      </Text>

      <Pressable
        onPress={() => router.replace("/(tabs)")}
        className="w-full items-center rounded-xl bg-primary px-8 py-4"
      >
        <Text className="text-base font-bold text-white">Go to Dashboard</Text>
      </Pressable>
    </View>
  );
}

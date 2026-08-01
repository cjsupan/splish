import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";

export default function OwnerHomeScreen() {
  const { profile } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header */}
        <View className="pb-6 pt-4">
          <Text className="text-ink-secondary font-sans text-sm">
            Your shop dashboard
          </Text>
          <Text className="text-ink mt-0.5 font-display text-2xl">
            Hey, {profile?.first_name?.split(" ")[0] ?? "there"} 👋
          </Text>
        </View>

        {/* Quick stats — TODO: wire to real data */}
        <View className="mb-6 flex-row gap-3">
          {[
            { label: "Pending", value: "0", emoji: "⏳" },
            { label: "Today", value: "0", emoji: "📦" },
            { label: "Completed", value: "0", emoji: "✅" },
          ].map(({ label, value, emoji }) => (
            <View
              key={label}
              className="flex-1 items-center gap-1 rounded-2xl border border-border bg-surface py-4"
            >
              <Text className="text-2xl">{emoji}</Text>
              <Text className="text-ink text-xl font-bold">{value}</Text>
              <Text className="text-ink-secondary font-sans text-xs">
                {label}
              </Text>
            </View>
          ))}
        </View>

        {/* Recent orders placeholder */}
        <Text className="text-ink mb-4 text-lg font-bold">Recent orders</Text>
        <View className="items-center rounded-2xl border border-border bg-surface p-6">
          <Text className="mb-2 text-3xl">📭</Text>
          <Text className="text-ink font-semibold">No orders yet</Text>
          <Text className="text-ink-secondary mt-1 text-center font-sans text-sm">
            New bookings will appear here.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

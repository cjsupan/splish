import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";

export default function CustomerHomeScreen() {
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
            Good morning 👋
          </Text>
          <Text className="text-ink mt-0.5 font-display text-2xl">
            {profile?.first_name?.split(" ")[0] ?? "there"}
          </Text>
        </View>

        {/* Category Pills */}
        <View className="mb-6 flex-row gap-3">
          {[
            { label: "Laundry", emoji: "👕" },
            { label: "Water Station", emoji: "💧" },
          ].map(({ label, emoji }) => (
            <View
              key={label}
              className="flex-1 items-center gap-1.5 rounded-2xl border border-border bg-surface py-4"
            >
              <Text className="text-3xl">{emoji}</Text>
              <Text className="text-ink text-sm font-semibold">{label}</Text>
            </View>
          ))}
        </View>

        {/* Nearby Shops — TODO: replace with real data */}
        <Text className="text-ink mb-4 text-lg font-bold">Nearby shops</Text>
        <View className="items-center rounded-2xl border border-border bg-surface p-6">
          <Text className="mb-2 text-3xl">🔍</Text>
          <Text className="text-ink font-semibold">Looking for shops…</Text>
          <Text className="text-ink-secondary mt-1 text-center font-sans text-sm">
            Add your address to see shops near you.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

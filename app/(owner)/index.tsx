import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';

export default function OwnerDashboardScreen() {
  const { profile } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View className="pt-4 pb-6">
          <Text className="text-ink-secondary font-sans text-sm">Your shop dashboard</Text>
          <Text className="text-ink font-display text-2xl mt-0.5">
            Hey, {profile?.full_name?.split(' ')[0] ?? 'there'} 👋
          </Text>
        </View>

        {/* Quick stats — TODO: wire to real data */}
        <View className="flex-row gap-3 mb-6">
          {[
            { label: 'Pending',    value: '0', emoji: '⏳' },
            { label: 'Today',      value: '0', emoji: '📦' },
            { label: 'Completed',  value: '0', emoji: '✅' },
          ].map(({ label, value, emoji }) => (
            <View
              key={label}
              className="flex-1 bg-surface border border-border rounded-2xl py-4 items-center gap-1"
            >
              <Text className="text-2xl">{emoji}</Text>
              <Text className="text-ink font-bold text-xl">{value}</Text>
              <Text className="text-ink-secondary font-sans text-xs">{label}</Text>
            </View>
          ))}
        </View>

        {/* Recent orders placeholder */}
        <Text className="text-ink font-bold text-lg mb-4">Recent orders</Text>
        <View className="bg-surface rounded-2xl border border-border p-6 items-center">
          <Text className="text-3xl mb-2">📭</Text>
          <Text className="text-ink font-semibold">No orders yet</Text>
          <Text className="text-ink-secondary font-sans text-sm text-center mt-1">
            New bookings will appear here.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

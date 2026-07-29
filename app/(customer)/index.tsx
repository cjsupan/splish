import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';

export default function CustomerHomeScreen() {
  const { profile } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View className="pt-4 pb-6">
          <Text className="text-ink-secondary font-sans text-sm">Good morning 👋</Text>
          <Text className="text-ink font-display text-2xl mt-0.5">
            {profile?.full_name?.split(' ')[0] ?? 'there'}
          </Text>
        </View>

        {/* Category Pills */}
        <View className="flex-row gap-3 mb-6">
          {[
            { label: 'Laundry',       emoji: '👕' },
            { label: 'Water Station', emoji: '💧' },
          ].map(({ label, emoji }) => (
            <View
              key={label}
              className="flex-1 bg-surface border border-border rounded-2xl py-4 items-center gap-1.5"
            >
              <Text className="text-3xl">{emoji}</Text>
              <Text className="text-ink font-semibold text-sm">{label}</Text>
            </View>
          ))}
        </View>

        {/* Nearby Shops — TODO: replace with real data */}
        <Text className="text-ink font-bold text-lg mb-4">Nearby shops</Text>
        <View className="bg-surface rounded-2xl border border-border p-6 items-center">
          <Text className="text-3xl mb-2">🔍</Text>
          <Text className="text-ink font-semibold">Looking for shops…</Text>
          <Text className="text-ink-secondary font-sans text-sm text-center mt-1">
            Add your address to see shops near you.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

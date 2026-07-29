import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

interface ScreenHeaderProps {
  title:       string;
  subtitle?:   string;
  showBack?:   boolean;
  right?:      React.ReactNode;
}

export function ScreenHeader({ title, subtitle, showBack = false, right }: ScreenHeaderProps) {
  return (
    <View className="flex-row items-center gap-3 px-5 py-4">
      {showBack && (
        <Pressable
          onPress={() => router.back()}
          className="w-9 h-9 items-center justify-center rounded-full bg-muted"
        >
          <Text className="text-ink font-bold text-base">←</Text>
        </Pressable>
      )}

      <View className="flex-1">
        <Text className="text-ink font-display text-xl">{title}</Text>
        {subtitle && (
          <Text className="text-ink-secondary font-sans text-sm mt-0.5">{subtitle}</Text>
        )}
      </View>

      {right}
    </View>
  );
}

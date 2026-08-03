import { TextInput, TouchableOpacity, View } from "react-native";
import Lucide from "@react-native-vector-icons/lucide";

import { colors } from "@/constants/design/theme";

interface HomeSearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  onFilterPress?: () => void;
}

export function HomeSearchBar({
  value,
  onChangeText,
  onFilterPress,
}: HomeSearchBarProps) {
  return (
    <View className="mt-4 flex-row gap-3">
      <View className="flex-1 flex-row items-center rounded-md border border-border bg-surface px-4 shadow-sm shadow-border">
        <Lucide name="search" size={22} color={colors.textPrimary} />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search laundry or water shops..."
          placeholderTextColor={colors.textMuted}
          returnKeyType="search"
          className="ml-2 flex-1 py-3 text-base text-text-primary"
        />

        {value.length > 0 ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onChangeText("")}
          >
            <Lucide name="x" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onFilterPress}
        className="items-center justify-center rounded-md bg-primary px-4 shadow-sm"
      >
        <Lucide name="filter" size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

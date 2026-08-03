import { View, Text, TouchableOpacity } from "react-native";
import Lucide from "@react-native-vector-icons/lucide";
import { Ionicons } from "@react-native-vector-icons/ionicons";

import { Select } from "@/components/ui/Select";
import { colors } from "@/constants/design/theme";

interface HomeHeaderProps {
  addressOptions: {
    label: string;
    value: string;
  }[];
  selectedAddress?: string;
  placeholder: string;
  onAddressChange: (value: string) => void;
  onNotificationPress?: () => void;
}

export function HomeHeader({
  addressOptions,
  selectedAddress,
  placeholder,
  onAddressChange,
  onNotificationPress,
}: HomeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between pb-2">
      <View className="flex-1 pr-4">
        <Text className="font-body-medium text-sm text-text-primary">
          Deliver to
        </Text>

        <View className="mt-1 flex-row items-center gap-1">
          <Ionicons name="location-outline" size={20} color={colors.primary} />

          <Select
            options={addressOptions}
            value={selectedAddress}
            onChange={onAddressChange}
            placeholder={placeholder}
            variant="ghost"
            className="mb-0 flex-1"
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={onNotificationPress}
        className="rounded-full border border-border bg-surface p-2.5 shadow-sm"
      >
        <Lucide name="bell" size={22} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

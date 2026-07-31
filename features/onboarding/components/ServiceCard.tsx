import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { colors } from "@/constants/design/theme";
import { ServiceItemFormData } from "../schema";

interface ServiceCardProps extends ServiceItemFormData {
  onRemove: () => void;
}

export function ServiceCard({
  name,
  description,
  price,
  unit,
  min_qty,
  is_available,
  onRemove,
}: ServiceCardProps) {
  return (
    <View
      className="flex-row overflow-hidden rounded-xl border border-primary-dark bg-white shadow-sm"
      style={{ elevation: 1 }}
    >
      {/* Left accent stripe */}
      <View className="w-1.5 rounded-l-xl bg-primary-dark" />

      <View className="flex-1 gap-2 px-4 py-3">
        {/* Name row + remove */}
        <View className="flex-row items-start justify-between gap-2">
          <Text
            className="flex-1 text-base font-bold text-text-primary"
            numberOfLines={1}
          >
            {name}
          </Text>
          <TouchableOpacity
            onPress={onRemove}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name="close-circle-outline"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Description */}
        {!!description && (
          <Text
            className="text-sm leading-snug text-text-muted"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
        )}

        {/* Meta row */}
        <View className="flex-row items-center gap-2">
          {/* Price chip */}
          <View className="flex-row items-baseline gap-0.5 rounded-md bg-primary px-2.5 py-1">
            <Text className="text-sm font-extrabold text-white">
              ₱{price.toLocaleString()}
            </Text>
            <Text className="text-[10px] font-medium text-white opacity-75">
              /{unit}
            </Text>
          </View>

          {/* Min qty */}
          <View className="flex-row items-center gap-1">
            <Ionicons
              name="layers-outline"
              size={12}
              color={colors.textMuted}
            />
            <Text className="text-xs text-text-muted">
              Min {min_qty} {unit}
            </Text>
          </View>

          <View className="flex-1" />

          {/* Availability badge */}
          <View
            className={`rounded-full px-2.5 py-0.5 ${
              is_available ? "bg-emerald-50" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-[11px] font-semibold ${
                is_available ? "text-emerald-700" : "text-gray-400"
              }`}
            >
              {is_available ? "● Available" : "○ Unavailable"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

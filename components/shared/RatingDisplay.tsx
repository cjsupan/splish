import { Text, View } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";

interface RatingDisplayProps {
  rating: number;
  reviews?: string | number;
  distance?: string;
  size?: "sm" | "md";
  className?: string;
}

export function RatingDisplay({
  rating,
  reviews,
  distance,
  size = "sm",
  className = "",
}: RatingDisplayProps) {
  const iconSize = size === "sm" ? 14 : 18;
  const textSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <View className={`flex-row items-center gap-2.5 ${className}`}>
      <Ionicons name="star" size={iconSize} color="#F59E0B" />

      <Text className={`font-body-semibold text-text-primary ${textSize}`}>
        {rating}

        {reviews !== undefined && (
          <Text className="font-body-medium text-text-muted"> ({reviews})</Text>
        )}

        {distance ? ` • ${distance}` : ""}
      </Text>
    </View>
  );
}

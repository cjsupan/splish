import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Lucide from "@react-native-vector-icons/lucide";

import { BusinessImage, RatingDisplay } from "@/components/shared";
import { Badge, Card } from "@/components/ui";
import { colors } from "@/constants/design/theme";

import { CustomerHomeShop } from "../types";

interface ShopCardProps {
  shop: CustomerHomeShop;
  onPress?: (shop: CustomerHomeShop) => void;
  onBookPress?: (shop: CustomerHomeShop) => void;
}

export function ShopCard({ shop, onPress, onBookPress }: ShopCardProps) {
  const handleBookPress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onBookPress?.(shop);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress?.(shop)}
      disabled={!onPress}
    >
      <Card className="mb-4 flex-row items-center gap-3 p-3">
        <BusinessImage uri={shop.image} className="h-20 w-20 rounded-md" />

        <View className="flex-1 justify-between">
          <View>
            <Text
              className="font-display-extrabold text-sm text-text-primary"
              numberOfLines={1}
            >
              {shop.name}
            </Text>

            <RatingDisplay
              rating={shop.rating}
              reviews={shop.reviews}
              distance={shop.distance}
              className="mt-1"
            />
          </View>

          <View className="mt-2 flex-row items-center justify-between">
            <View className="mr-2 flex-1 flex-row flex-wrap gap-2">
              {shop.tags.map((tag) => (
                <Badge key={tag} variant="primary">
                  {tag}
                </Badge>
              ))}
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleBookPress}
              className="flex-row items-center gap-1 rounded-sm bg-primary px-4 py-1.5"
            >
              <Text className="font-body-semibold text-white">Book</Text>

              <Lucide name="chevron-right" size={14} color={colors.surface} />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

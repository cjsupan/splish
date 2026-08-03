import { Text, View } from "react-native";

import { EmptyState } from "@/components/shared";

import { CustomerHomeShop } from "../types";
import { ShopCard } from "./ShopCard";

interface NearbyShopsProps {
  shops: CustomerHomeShop[];
  onShopPress?: (shop: CustomerHomeShop) => void;
  onBookPress?: (shop: CustomerHomeShop) => void;
}

export function NearbyShops({
  shops,
  onShopPress,
  onBookPress,
}: NearbyShopsProps) {
  return (
    <View className="mt-6">
      <Text className="mb-4 font-body-extrabold text-md text-text-primary">
        Nearby Shops
      </Text>

      {shops.length === 0 ? (
        <EmptyState
          icon="store"
          title="No shops found"
          description="Try another search term or service category."
        />
      ) : (
        shops.map((shop) => (
          <ShopCard
            key={shop.id}
            shop={shop}
            onPress={onShopPress}
            onBookPress={onBookPress}
          />
        ))
      )}
    </View>
  );
}

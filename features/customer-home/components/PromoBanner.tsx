import { Text, View } from "react-native";

import { CustomerHomePromo } from "../types";

interface PromoBannerProps {
  promo: CustomerHomePromo;
}

export function PromoBanner({ promo }: PromoBannerProps) {
  return (
    <View className="mt-6">
      <View className="flex-row items-center justify-between overflow-hidden rounded-lg bg-primary-dark/85 p-4">
        <View className="mr-3 flex-1">
          <Text className="font-body-bold text-sm text-primary-tint">
            {promo.eyebrow}
          </Text>

          <Text className="font-body-extrabold text-lg text-surface">
            {promo.title}
          </Text>
        </View>

        <View className="rounded-md bg-primary px-3 py-2">
          <Text className="font-body-bold text-sm text-surface">
            Code: {promo.code}
          </Text>
        </View>
      </View>
    </View>
  );
}

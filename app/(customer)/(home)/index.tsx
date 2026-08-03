import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import {
  CategoryList,
  CUSTOMER_HOME_CATEGORIES,
  CUSTOMER_HOME_PROMO,
  CustomerHomeShop,
  HomeHeader,
  HomeSearchBar,
  NearbyShops,
  PromoBanner,
  useCustomerHome,
} from "@/features/customer-home";

export default function HomeScreen() {
  const router = useRouter();

  const {
    addressOptions,
    addressPlaceholder,
    filteredShops,
    searchQuery,
    selectedAddressId,
    selectedCategoryId,
    setSearchQuery,
    setSelectedAddressId,
    setSelectedCategoryId,
  } = useCustomerHome();

  const handleShopPress = (shop: CustomerHomeShop) => {
    router.push({
      pathname: "/(customer)/business/[businessId]",
      params: {
        businessId: shop.id,
      },
    });
  };

  const handleBookPress = (shop: CustomerHomeShop) => {
    router.push({
      pathname: "/(customer)/business/[businessId]",
      params: {
        businessId: shop.id,
        action: "book",
      },
    });
  };

  const handleNotificationPress = () => {
    router.push("/(customer)/notifications");
  };

  const handleFilterPress = () => {};

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background px-5">
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="pb-6 pt-3"
      >
        <HomeHeader
          addressOptions={addressOptions}
          selectedAddress={selectedAddressId}
          placeholder={addressPlaceholder}
          onAddressChange={setSelectedAddressId}
          onNotificationPress={handleNotificationPress}
        />

        <HomeSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={handleFilterPress}
        />

        <PromoBanner promo={CUSTOMER_HOME_PROMO} />

        <CategoryList
          categories={CUSTOMER_HOME_CATEGORIES}
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
        />

        <NearbyShops
          shops={filteredShops}
          onShopPress={handleShopPress}
          onBookPress={handleBookPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

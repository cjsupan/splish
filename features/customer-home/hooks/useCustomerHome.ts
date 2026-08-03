import { useEffect, useMemo, useState } from "react";

import { useAddresses } from "@/hooks/useAddress";

import { CUSTOMER_HOME_CATEGORIES, CUSTOMER_HOME_SHOPS } from "../constants";

export function useCustomerHome() {
  const { data: addresses, isLoading: isLoadingAddresses } = useAddresses();

  const [selectedAddressId, setSelectedAddressId] = useState<string>();
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    CUSTOMER_HOME_CATEGORIES[0]?.id ?? "",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const defaultAddress = useMemo(
    () => addresses?.find((address) => address.is_default),
    [addresses],
  );

  const addressOptions = useMemo(
    () =>
      addresses?.map((address) => ({
        value: address.id,
        label: [address.street, address.barangay, address.city]
          .filter(Boolean)
          .join(", "),
      })) ?? [],
    [addresses],
  );

  useEffect(() => {
    if (!selectedAddressId && defaultAddress?.id) {
      setSelectedAddressId(defaultAddress.id);
    }
  }, [defaultAddress?.id, selectedAddressId]);

  const selectedCategory = useMemo(
    () =>
      CUSTOMER_HOME_CATEGORIES.find(
        (category) => category.id === selectedCategoryId,
      ),
    [selectedCategoryId],
  );

  const filteredShops = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return CUSTOMER_HOME_SHOPS.filter((shop) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        shop.name.toLowerCase().includes(normalizedSearch) ||
        shop.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      if (!matchesSearch) {
        return false;
      }

      if (!selectedCategory) {
        return true;
      }

      const categoryLabel = selectedCategory.label.toLowerCase();

      if (selectedCategory.id === "water-delivery") {
        return shop.tags.some((tag) =>
          ["purified", "alkaline", "water"].some((keyword) =>
            tag.toLowerCase().includes(keyword),
          ),
        );
      }

      return shop.tags.some((tag) => {
        const normalizedTag = tag.toLowerCase();

        return (
          normalizedTag.includes(categoryLabel) ||
          categoryLabel.includes(normalizedTag)
        );
      });
    });
  }, [searchQuery, selectedCategory]);

  const addressPlaceholder = defaultAddress
    ? [defaultAddress.street, defaultAddress.barangay]
        .filter(Boolean)
        .join(", ")
    : isLoadingAddresses
      ? "Loading addresses..."
      : "Select delivery address";

  return {
    addressOptions,
    addressPlaceholder,
    filteredShops,
    isLoadingAddresses,
    searchQuery,
    selectedAddressId,
    selectedCategoryId,
    setSearchQuery,
    setSelectedAddressId,
    setSelectedCategoryId,
  };
}

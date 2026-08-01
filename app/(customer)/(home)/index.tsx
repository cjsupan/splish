import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Lucide } from "@react-native-vector-icons/lucide";
import { colors } from "@/constants/design/theme";
import { Select } from "@/components/ui/Select";
import { useAuthStore } from "@/store/authStore";
import { useAddresses } from "@/hooks/useAddress";
import { useMemo, useState } from "react";

export default function HomeScreen() {
  const { data: addresses } = useAddresses();
  const defaultAddress = addresses?.find((address) => address.is_default);

  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(
    defaultAddress?.id,
  );

  const options = useMemo(() => {
    if (!addresses) return [];
    return addresses.map((address) => ({
      value: address.id,
      label: `${address.street}, ${address.barangay}, ${address.city}`,
    }));
  }, [addresses]);

  console.log("default address", defaultAddress);
  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-primary-tint px-5 pb-5 pt-3"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="font-body-medium text-sm">Deliver to</Text>
          <View className="flex-row items-center gap-2">
            <Lucide name="map-pin" size={20} color={colors.primary} />
            {/* <Text className="font-body-bold text-md">
              {`${defaultAddress?.street}, ${defaultAddress?.barangay}, ${defaultAddress?.city}`}
            </Text> */}
            <Select
              options={options}
              placeholder={defaultAddress?.label}
              value={selectedAddress}
              onChange={(value) => {
                setSelectedAddress(value);
              }}
              className="mb-0 flex-1 bg-transparent"
            />
          </View>
        </View>
        <TouchableOpacity>
          <Lucide name="bell" size={24} color={colors.primaryDark} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

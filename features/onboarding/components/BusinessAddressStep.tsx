import { FormInput } from "@/components/ui/FormInput";
import { Select } from "@/components/ui/Select";
import { colors } from "@/constants/design/theme";
import {
  usePsgcBarangays,
  usePsgcCities,
  usePsgcProvinces,
  usePsgcRegions,
} from "@/hooks/usePsgc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  BusinessAddressFormData,
  BusinessAddressFormInput,
  businessAddressSchema,
} from "../schema";
import { useOnboardingStore } from "../store/onBoardingStore";
import { SafeAreaView } from "react-native-safe-area-context";

interface BusinessAddressStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function BusinessAddressStep({
  onNext,
  onBack,
}: BusinessAddressStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { businessAddress, setBusinessAddress, role } = useOnboardingStore();

  const {
    control,
    trigger,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<BusinessAddressFormInput, any, BusinessAddressFormData>({
    resolver: zodResolver(businessAddressSchema),
    defaultValues: {
      region: businessAddress.region || "",
      region_code: businessAddress.region_code || "",
      province: businessAddress.province || "",
      province_code: businessAddress.province_code || "",
      city: businessAddress.city || "",
      city_code: businessAddress.city_code || "",
      barangay: businessAddress.barangay || "",
      barangay_code: businessAddress.barangay_code || "",
      street: businessAddress.street || "",
      unit: businessAddress.unit || "",
    },
    mode: "onChange",
  });

  const regionCode = watch("region_code");
  const provinceCode = watch("province_code");
  const cityCode = watch("city_code");

  const { data: regions = [], isLoading: regionsLoading } = usePsgcRegions();

  const { data: provinces = [], isLoading: provincesLoading } =
    usePsgcProvinces(regionCode);
  const { data: cities = [], isLoading: citiesLoading } =
    usePsgcCities(provinceCode);
  const { data: barangays = [], isLoading: barangaysLoading } =
    usePsgcBarangays(cityCode);

  const handleContinue = async () => {
    const isValid = await trigger();
    if (!isValid) return;
    setIsLoading(true);
    try {
      const formValues = getValues();
      setBusinessAddress(formValues);
      onNext();
    } catch (error) {
      console.error("Error submitting onboarding:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalSteps = role === "owner" ? 7 : 4;

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-surface">
      <View className="flex-1 gap-8 px-6 pb-4">
        {/* Back Button */}
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={onBack}>
            <Text className="font-display-medium text-base text-primary-dark">
              Back
            </Text>
          </TouchableOpacity>

          {/* Progress Indicator (Step 2) */}

          <View className="flex-row items-center gap-2">
            <View className="h-2 w-2 rounded-full bg-primary-dark" />
            <View className="h-2 w-2 rounded-full bg-primary-dark" />
            <View className="h-2 w-2 rounded-full bg-primary-dark" />
            <View className="h-2 w-2 rounded-full bg-primary-dark" />
            <View className="h-2 w-4 rounded-full bg-primary-dark" />
            <View className="h-2 w-12 rounded-full bg-primary" />
            <View className="h-2 w-4 rounded-full bg-gray-300" />
          </View>
          <Text className="font-body-semibold text-sm text-gray-500">
            Step 6/{totalSteps}
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header (Matches onboarding-address.png exactly) */}
          <View className="mb-8">
            <Text className="mb-2 text-3xl font-extrabold text-[#1a2b3c]">
              Business Address
            </Text>
            <Text className="text-base text-gray-500">
              Where should customers drop off or book deliveries?
            </Text>
          </View>

          <View className="gap-2">
            <Controller
              control={control}
              name="region"
              render={({ field: { value, onChange } }) => (
                <Select<string>
                  label="Region"
                  placeholder={regionsLoading ? "Loading..." : "Select Region"}
                  title="Select Region"
                  options={regions}
                  value={value}
                  onChange={(val, code) => {
                    onChange(val);
                    setValue("region_code", code ?? "");
                    setValue("province", "");
                    setValue("province_code", "");
                    setValue("city", "");
                    setValue("city_code", "");
                    setValue("barangay", "");
                    setValue("barangay_code", "");
                  }}
                  searchable
                  loading={regionsLoading}
                />
              )}
            />

            <Controller
              control={control}
              name="province"
              render={({ field: { value, onChange } }) => (
                <Select<string>
                  label="Province"
                  placeholder={
                    provincesLoading ? "Loading..." : "Select Province"
                  }
                  title="Select Province"
                  options={provinces}
                  value={value}
                  onChange={(val, code) => {
                    onChange(val);
                    setValue("province_code", code ?? "");
                    setValue("city", "");
                    setValue("city_code", "");
                    setValue("barangay", "");
                    setValue("barangay_code", "");
                  }}
                  searchable
                  loading={provincesLoading}
                  disabled={!regionCode}
                />
              )}
            />

            <Controller
              control={control}
              name="city"
              render={({ field: { value, onChange } }) => (
                <Select<string>
                  label="City"
                  placeholder={citiesLoading ? "Loading..." : "Select City"}
                  title="Select City"
                  options={cities}
                  value={value}
                  onChange={(val, code) => {
                    onChange(val);
                    setValue("city_code", code ?? "");
                    setValue("barangay", "");
                    setValue("barangay_code", "");
                  }}
                  searchable
                  loading={citiesLoading}
                  disabled={!provinceCode}
                />
              )}
            />

            <Controller
              control={control}
              name="barangay"
              render={({ field: { value, onChange } }) => (
                <Select<string>
                  label="Barangay"
                  placeholder={
                    barangaysLoading ? "Loading..." : "Select Barangay"
                  }
                  title="Select Barangay"
                  options={barangays}
                  value={value}
                  onChange={(val, code) => {
                    onChange(val);
                    setValue("barangay_code", code ?? "");
                  }}
                  searchable
                  loading={barangaysLoading}
                  disabled={!cityCode}
                />
              )}
            />

            <FormInput
              control={control}
              name="street"
              label="Street Name, Building No."
              placeholder="e.g. 123 Pioneer Street"
              placeholderTextColor={colors.textMuted || "#9ca3af"}
              inputWrapperClassName="bg-white border border-gray-200 rounded-lg"
            />

            <FormInput
              control={control}
              name="unit"
              label="Unit / Floor / Suite"
              placeholder="e.g. Tower A, Room 1402"
              placeholderTextColor={colors.textMuted || "#9ca3af"}
              inputWrapperClassName="bg-white border border-gray-200 rounded-lg"
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={handleContinue}
          disabled={isLoading}
          className="mt-6 items-center rounded-xl bg-primary py-4"
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-lg font-bold text-white">Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

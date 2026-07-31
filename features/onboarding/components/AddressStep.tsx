import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Controller, useForm } from "react-hook-form";

import { FormInput } from "@/components/ui/FormInput";
import { colors } from "@/constants/design/theme";
import {
  usePsgcRegions,
  usePsgcProvinces,
  usePsgcCities,
  usePsgcBarangays,
} from "@/hooks/usePsgc";
import {
  AddressFormInput,
  AddressFormData,
  addressSchema,
} from "@/features/onboarding/schema";
import { Select } from "@/components/ui/Select";
import { useOnboardingStore } from "../store/onBoardingStore";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddressStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function AddressStep({ onNext, onBack }: AddressStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { address, setAddress, role } = useOnboardingStore();

  const {
    control,
    trigger,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<AddressFormInput, any, AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      region: address.region || "",
      region_code: address.region_code || "",
      province: address.province || "",
      province_code: address.province_code || "",
      city: address.city || "",
      city_code: address.city_code || "",
      barangay: address.barangay || "",
      barangay_code: address.barangay_code || "",
      street: address.street || "",
      unit: address.unit || "",
      label: address.label || "", // Added requested label field
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
      setAddress(formValues);
      onNext();
    } catch (error) {
      console.error("Error submitting onboarding:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine total steps based on role for the progress indicator
  const totalSteps = role === "owner" ? 7 : 4;

  return (
    <View className="flex-1 bg-surface pt-4">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingVertical: 32,
        }}
      >
        {/* Back Button */}
        <TouchableOpacity onPress={onBack} className="mb-6">
          <Text className="text-base font-bold text-[#4B5E6D]">Back</Text>
        </TouchableOpacity>

        {/* Progress Indicator (Step 4) */}
        <View className="mb-8 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View className="h-2 w-2 rounded-full bg-[#1a2b3c]" />{" "}
            {/* Step 1 */}
            <View className="h-2 w-2 rounded-full bg-[#1a2b3c]" />{" "}
            {/* Step 2 */}
            <View className="h-2 w-6 rounded-full bg-[#1a2b3c]" />{" "}
            {/* Step 3 */}
            <View className="h-2 w-28 rounded-full bg-primary" />{" "}
            {/* Current Step 4 */}
            {role === "owner" && (
              <>
                <View className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                <View className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                <View className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              </>
            )}
          </View>
          <Text className="text-sm font-semibold text-gray-500">
            Step 4 of {totalSteps}
          </Text>
        </View>

        {/* Header (Matches onboarding-address.png exactly) */}
        <View className="mb-8">
          <Text className="mb-2 text-3xl font-extrabold text-[#1a2b3c]">
            Your Address
          </Text>
          <Text className="text-base text-gray-500">
            Provide your delivery and pick-up location.
          </Text>
        </View>

        <View className="gap-2">
          <FormInput
            control={control}
            name="label"
            label="Address Label"
            placeholder="e.g. Home, Office, Apartment"
            placeholderTextColor={colors.textMuted || "#9ca3af"}
            inputWrapperClassName="bg-white border border-gray-200 rounded-lg"
          />

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

        {/* Spacer to push button to bottom if screen is tall */}
        <View className="min-h-[32px] flex-1" />

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
      </ScrollView>
    </View>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Switch,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Ionicons from "@react-native-vector-icons/ionicons";

import { FormInput } from "@/components/ui/FormInput";
import { Select } from "@/components/ui/Select";
import { colors } from "@/constants/design/theme";
import { useOnboardingStore } from "../store/onBoardingStore";

// Note: Ensure you have this schema defined in your schema.ts file
import {
  BusinessDetailsFormInput,
  businessDetailsSchema,
  BusinessDetailsFormData,
} from "@/features/onboarding/schema";

interface BusinessDetailsStepProps {
  onNext: () => void;
  onBack: () => void;
}

// Mock categories for the Select dropdown
const CATEGORY_OPTIONS = [
  { label: "Laundry Shop", value: "laundry" },
  { label: "Water Refilling Station", value: "water_station" },
];

export default function BusinessDetailsStep({
  onNext,
  onBack,
}: BusinessDetailsStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { business, setBusiness, role } = useOnboardingStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessDetailsFormInput, any, BusinessDetailsFormData>({
    resolver: zodResolver(businessDetailsSchema),
    defaultValues: {
      name: business?.name,
      phone: business?.phone,
      category: business?.category,
      description: business?.description,
      logo_url: "",
      cover_url: "",
      is_active: business?.is_active ?? true,
    },
    mode: "onChange",
  });

  const handleContinue = async (data: BusinessDetailsFormData) => {
    setIsLoading(true);
    try {
      setBusiness(data);
      onNext();
    } catch (error) {
      console.error("Error submitting business details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalSteps = role === "owner" ? 7 : 4;

  return (
    <View className="flex-1 bg-surface px-6 pt-4">
      <TouchableOpacity onPress={onBack} className="mb-6">
        <Text className="text-base font-bold text-[#4B5E6D]">Back</Text>
      </TouchableOpacity>

      <View className="mb-8 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="h-2 w-4 rounded-full bg-primary-dark" />
          <View className="h-2 w-4 rounded-full bg-primary-dark" />
          <View className="h-2 w-4 rounded-full bg-primary-dark" />
          <View className="h-2 w-6 rounded-full bg-primary-dark" />
          <View className="h-1.5 w-24 rounded-full bg-primary" />
          <View className="h-2 w-6 rounded-full bg-gray-300" />
          <View className="h-2 w-4 rounded-full bg-gray-300" />
        </View>

        <Text className="text-sm font-semibold text-gray-500">
          Step 5 of {totalSteps}
        </Text>
      </View>

      <View className="mb-8">
        <Text className="mb-2 text-3xl font-extrabold text-[#1a2b3c]">
          Business Details
        </Text>

        <Text className="text-base text-gray-500">
          Set up your shop profile for potential clients.
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 24,
        }}
      >
        <View className="gap-4">
          <FormInput
            control={control}
            name="name"
            label="Business Name"
            placeholder="e.g. Pioneer Express Laundry"
            placeholderTextColor={colors.textMuted || "#9ca3af"}
            inputWrapperClassName="bg-white border border-gray-200 rounded-lg"
          />

          <Controller
            control={control}
            name="category"
            render={({ field: { value, onChange } }) => (
              <Select<string>
                label="Category"
                placeholder="Laundry Shop"
                title="Select Category"
                options={CATEGORY_OPTIONS}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <FormInput
            control={control}
            name="description"
            label="Description"
            placeholder="Tell customers about your services, standards, and special offers..."
            placeholderTextColor={colors.textMuted || "#9ca3af"}
            multiline
            numberOfLines={4}
            inputWrapperClassName="bg-white border border-gray-200 rounded-lg h-28 items-start"

            style={{ textAlignVertical: "top" }}
          />

          {/* Consistent Phone Input without the +63 side-box */}
          <FormInput
            control={control}
            name="phone"
            label="Business Phone Number"
            placeholder="0917 555 0199"
            keyboardType="phone-pad"
            placeholderTextColor={colors.textMuted || "#9ca3af"}
            inputWrapperClassName="bg-white border border-gray-200 rounded-lg"
          />

          {/* Image Uploads */}
          <View className="mt-2 flex-row gap-4">
            {/* Logo */}
            <View className="max-w-[120px] flex-1">
              <Text className="mb-1.5 text-sm font-bold text-[#1a2b3c]">
                Logo
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                className="h-28 items-center justify-center rounded-lg border-2 border-dashed border-primary bg-white"
              >
                <Ionicons
                  name="cloud-upload-outline"
                  size={24}
                  color="#0d9488"
                />
                <Text className="mt-2 text-xs font-bold text-primary">
                  Upload Logo
                </Text>
              </TouchableOpacity>
            </View>

            {/* Cover Photo */}
            <View className="flex-1">
              <Text className="mb-1.5 text-sm font-bold text-[#1a2b3c]">
                Cover Photo
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                className="h-28 items-center justify-center rounded-lg border-2 border-dashed border-primary bg-white"
              >
                <Ionicons
                  name="cloud-upload-outline"
                  size={24}
                  color="#0d9488"
                />
                <Text className="mt-2 text-xs font-bold text-primary">
                  Upload Cover Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Active Toggle */}
          <View className="my-4 flex-row items-center justify-between">
            <Text className="text-base font-bold text-[#1a2b3c]">
              Business is active
            </Text>
            <Controller
              control={control}
              name="is_active"
              render={({ field: { value, onChange } }) => (
                <Switch
                  trackColor={{ false: "#E5E7EB", true: "#0d9488" }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#E5E7EB"
                  onValueChange={onChange}
                  value={value}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={handleSubmit(handleContinue)}
        disabled={isLoading}
        className="mb-6 mt-4 items-center rounded-lg bg-primary py-4"
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-lg font-bold text-white">Continue</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

import React from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { useFormContext } from "react-hook-form";
import { OnboardingFormData } from "@/features/onboarding/schema";

interface StepProps {
  onNext: () => void;
}

export default function RoleStep({ onNext }: StepProps) {
  const { watch, setValue } = useFormContext<OnboardingFormData>();
  const currentRole = watch("role");

  return (
    <View className="flex-1 justify-between">
      <View>
        <Text className="mb-2 text-2xl font-bold text-gray-900">
          Select Your Role
        </Text>
        <Text className="mb-6 text-gray-500">
          How would you like to use the app?
        </Text>

        {/* Role Options */}
        <TouchableOpacity
          onPress={() => setValue("role", "customer")}
          className={`mb-4 rounded-2xl border-2 p-5 ${
            currentRole === "customer"
              ? "border-primary bg-primary/10"
              : "border-gray-200 bg-white"
          }`}
        >
          <Text className="text-lg font-bold text-gray-900">Customer</Text>
          <Text className="mt-1 text-sm text-gray-500">
            Order laundry services or water refilling deliveries.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setValue("role", "owner")}
          className={`mb-4 rounded-2xl border-2 p-5 ${
            currentRole === "owner"
              ? "border-primary bg-primary/10"
              : "border-gray-200 bg-white"
          }`}
        >
          <Text className="text-lg font-bold text-gray-900">Store Owner</Text>
          <Text className="mt-1 text-sm text-gray-500">
            List and manage your laundry shop or water station.
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={onNext}
        className="mt-6 items-center rounded-xl bg-primary py-4"
      >
        <Text className="text-base font-bold text-white">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

import { View, Text, TouchableOpacity } from "react-native";
import { useOnboardingStore } from "../store/onBoardingStore";
import { useState } from "react";
import { UserRole } from "@/types";
import Ionicons from "@react-native-vector-icons/ionicons"; // Updated import

interface StepProps {
  onNext: () => void;
}

export default function RoleStep({ onNext }: StepProps) {
  const [role, setRole] = useState<UserRole | null>(null);
  const { setRole: setRoleStore } = useOnboardingStore();

  const handleSubmit = () => {
    if (role) {
      setRoleStore(role);
      onNext();
    }
  };

  return (
    <View className="flex-1 justify-between bg-surface px-6 pb-8 pt-12">
      <View>
        {/* Progress Indicator */}
        <View className="mb-8 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View className="h-2 w-28 rounded-full bg-primary" />
            <View className="h-2 w-6 rounded-full bg-gray-300" />
            <View className="h-2 w-4 rounded-full bg-gray-300" />
            <View className="h-2 w-4 rounded-full bg-gray-300" />
          </View>
          <Text className="text-sm font-semibold text-gray-500">
            Step 1 of 4
          </Text>
        </View>

        {/* Headers */}
        <Text className="mb-2 text-3xl font-extrabold text-[#1a2b3c]">
          Choose Your Role
        </Text>
        <Text className="mb-8 text-base text-gray-500">
          Select how you would like to use AquaWash.
        </Text>

        {/* Role Options */}

        {/* Customer Card */}
        <TouchableOpacity
          onPress={() => setRole("customer")}
          activeOpacity={0.7}
          className={`mb-4 flex-row items-center rounded-2xl border-2 p-4 ${
            role === "customer"
              ? "border-primary bg-[#EAF5F4]"
              : "border-gray-200 bg-white"
          }`}
        >
          {/* Icon Box */}
          <View
            className={`mr-4 items-center justify-center rounded-xl p-3 ${
              role === "customer" ? "bg-primary" : "bg-gray-100"
            }`}
          >
            <Ionicons
              name="person-outline"
              size={24}
              color={role === "customer" ? "white" : "#6b7280"}
            />
          </View>

          {/* Text Content */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-[#1a2b3c]">Customer</Text>
            <Text className="mt-0.5 text-sm text-gray-500">
              Book laundry and water services
            </Text>
          </View>

          {/* Radio Button Indicator */}
          <View
            className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
              role === "customer" ? "border-primary" : "border-gray-300"
            }`}
          >
            {role === "customer" && (
              <View className="h-3 w-3 rounded-full bg-primary" />
            )}
          </View>
        </TouchableOpacity>

        {/* Business Owner Card */}
        <TouchableOpacity
          onPress={() => setRole("owner")}
          activeOpacity={0.7}
          className={`mb-4 flex-row items-center rounded-2xl border-2 p-4 ${
            role === "owner"
              ? "border-primary bg-[#EAF5F4]"
              : "border-gray-200 bg-white"
          }`}
        >
          {/* Icon Box */}
          <View
            className={`mr-4 items-center justify-center rounded-xl p-3 ${
              role === "owner" ? "bg-primary" : "bg-gray-100"
            }`}
          >
            <Ionicons
              name="storefront-outline"
              size={24}
              color={role === "owner" ? "white" : "#6b7280"}
            />
          </View>

          {/* Text Content */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-[#1a2b3c]">
              Business Owner
            </Text>
            <Text className="mt-0.5 text-sm text-gray-500">
              List and manage your services
            </Text>
          </View>

          {/* Radio Button Indicator */}
          <View
            className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
              role === "owner" ? "border-primary" : "border-gray-300"
            }`}
          >
            {role === "owner" && (
              <View className="h-3 w-3 rounded-full bg-primary" />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={!role}
        className={`mb-4 items-center rounded-xl py-4 ${
          role ? "bg-primary" : "bg-primary/50"
        }`}
      >
        <Text className="text-lg font-bold text-white">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

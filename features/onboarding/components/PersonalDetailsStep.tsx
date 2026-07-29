import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFormContext, Controller } from "react-hook-form";
import { OnboardingFormInput } from "@/features/onboarding/schema";
import { supabase } from "@/lib/supabase";
import Toast from "react-native-toast-message";

interface PersonalDetailsStepProps {
  onNext: () => void;
}

export default function PersonalDetailsStep({
  onNext,
}: PersonalDetailsStepProps) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<OnboardingFormInput>();

  const handleContinue = async () => {
    setApiError(null);

    // 1. Validate fields for this step first
    const isValid = await trigger(["first_name", "last_name", "phone_number"]);
    if (!isValid) return;

    const { first_name, last_name, phone_number } = getValues();

    try {
      setLoading(true);

      // 2. Get the current authenticated user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User session not found. Please log in again.");
      }

      //check if the user has already a profiles record
      const { data: existingProfile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (existingProfile) {
        //update the existing profile
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            first_name,
            last_name,
            role: getValues("role"),
            phone: phone_number,
          })
          .eq("id", user.id);
      } else {
        //insert the new profile
        const { error: profileError } = await supabase.from("profiles").insert({
          id: user.id,
          first_name,
          last_name,
          role: getValues("role"),
          phone: phone_number,
        });

        if (profileError) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: profileError.message,
          });
          return;
        }
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Details saved successfully",
      });

      // 5. Success -> Proceed to PhoneVerifyStep
      onNext();
    } catch (err: any) {
      console.error("PersonalDetailsStep Error:", err);
      setApiError(err.message || "Failed to save details and send SMS code.");
      console.log("error: ", err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-between">
      <View className="gap-5">
        {/* Header */}
        <View>
          <Text className="mb-2 text-2xl font-bold text-gray-900">
            Personal Details
          </Text>
          <Text className="text-gray-500">
            Enter your details and mobile number for verification.
          </Text>
        </View>

        {apiError && (
          <View className="rounded-xl border border-red-200 bg-red-50 p-4">
            <Text className="text-sm text-red-600">{apiError}</Text>
          </View>
        )}

        {/* First Name */}
        <View className="gap-1.5">
          <Text className="text-sm font-semibold text-gray-700">
            First Name
          </Text>
          <Controller
            control={control}
            name="first_name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="e.g. Juan"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                className={`w-full rounded-xl border bg-white px-4 py-3.5 text-base text-gray-900 ${
                  errors.first_name ? "border-red-500" : "border-gray-200"
                }`}
              />
            )}
          />
          {errors.first_name && (
            <Text className="text-xs text-red-500">
              {errors.first_name.message}
            </Text>
          )}
        </View>

        {/* Last Name */}
        <View className="gap-1.5">
          <Text className="text-sm font-semibold text-gray-700">Last Name</Text>
          <Controller
            control={control}
            name="last_name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="e.g. Dela Cruz"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                className={`w-full rounded-xl border bg-white px-4 py-3.5 text-base text-gray-900 ${
                  errors.last_name ? "border-red-500" : "border-gray-200"
                }`}
              />
            )}
          />
          {errors.last_name && (
            <Text className="text-xs text-red-500">
              {errors.last_name.message}
            </Text>
          )}
        </View>

        {/* Phone Number */}
        <View className="gap-1.5">
          <Text className="text-sm font-semibold text-gray-700">
            Phone Number
          </Text>
          <Controller
            control={control}
            name="phone_number"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="+63 912 345 6789"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                className={`w-full rounded-xl border bg-white px-4 py-3.5 text-base text-gray-900 ${
                  errors.phone_number ? "border-red-500" : "border-gray-200"
                }`}
              />
            )}
          />
          {errors.phone_number && (
            <Text className="text-xs text-red-500">
              {errors.phone_number.message}
            </Text>
          )}
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        onPress={handleContinue}
        disabled={loading}
        className="mt-6 flex-row items-center justify-center rounded-xl bg-primary py-4"
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-base font-bold text-white">
            Send Verification Code
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

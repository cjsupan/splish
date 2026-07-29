import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFormContext } from "react-hook-form";
import { OnboardingFormInput } from "@/features/onboarding/schema";
import { supabase } from "@/lib/supabase";
import Toast from "react-native-toast-message";

interface PhoneVerifyStepProps {
  onNext: () => void;
}

export default function PhoneVerifyStep({ onNext }: PhoneVerifyStepProps) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getValues } = useFormContext<OnboardingFormInput>();
  const phoneNumber = getValues("phone_number");

  const handleVerify = async () => {
    if (token.trim().length < 6) {
      setError("Please enter a valid 6-digit code.");
      Toast.show({
        type: "error",
        text1: "Please enter a valid 6-digit code.",
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Verify OTP via Supabase
      // const { error: verifyError } = await supabase.auth.verifyOtp({
      //   phone: phoneNumber,
      //   token: token.trim(),
      //   type: "phone_change", // or "sms" depending on your auth configuration
      // });

      // if (verifyError) throw verifyError;

      // OTP Verified successfully -> Proceed to next step (Address)
      Toast.show({
        type: "success",
        text1: "Phone number verified successfully!",
      });
      onNext();
    } catch (err: any) {
      console.error("OTP Verification Error:", err);
      setError(err.message || "Invalid or expired verification code.");
      Toast.show({
        type: "error",
        text1: "Invalid or expired verification code.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setError(null);
      // const { error: resendError } = await supabase.auth.updateUser({
      //   phone: phoneNumber,
      // });
      // if (resendError) throw resendError;
      Toast.show({
        type: "success",
        text1: "Code resent successfully!",
      });
    } catch (err: any) {
      setError(err.message || "Failed to resend code.");
      Toast.show({
        type: "error",
        text1: "Failed to resend code.",
      });
    }
  };

  return (
    <View className="flex-1 justify-between">
      <View className="gap-5">
        <View>
          <Text className="mb-2 text-2xl font-bold text-gray-900">
            Verify Phone Number
          </Text>
          <Text className="text-gray-500">
            Enter the 6-digit code sent to{" "}
            <Text className="font-bold text-gray-800">{phoneNumber}</Text>
          </Text>
        </View>

        {/* {error && (
          <View className="rounded-xl border border-red-200 bg-red-50 p-4">
            <Text className="text-sm text-red-600">{error}</Text>
          </View>
        )} */}

        {/* OTP Code Input */}
        <View className="gap-1.5">
          <Text className="text-sm font-semibold text-gray-700">
            Verification Code
          </Text>
          <TextInput
            value={token}
            onChangeText={setToken}
            placeholder="123456"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            maxLength={6}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-center text-2xl font-bold tracking-widest text-gray-900"
          />
        </View>

        {/* Resend Link */}
        <TouchableOpacity onPress={handleResend} className="align-self-start">
          <Text className="text-sm font-semibold text-primary">
            Didn't receive code? Resend SMS
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleVerify}
        disabled={loading}
        className="mt-6 flex-row items-center justify-center rounded-xl bg-primary py-4"
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-base font-bold text-white">
            Verify & Continue
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

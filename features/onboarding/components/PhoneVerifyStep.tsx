import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Toast from "react-native-toast-message";
import { useOnboardingStore } from "../store/onBoardingStore";

interface PhoneVerifyStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PhoneVerifyStep({
  onNext,
  onBack,
}: PhoneVerifyStepProps) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(105); // 1:45 in seconds
  const inputRef = useRef<TextInput>(null);

  const { personal, setPersonal, role } = useOnboardingStore();
  const phoneNumber = personal?.phone || "917 555 4321"; // Fallback if empty

  // Countdown Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Format timer to mm:ss
  const formattedTimer = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;

  const handleVerify = async () => {
    setLoading(true);
    if (!token || token.length < 6) {
      setError("Please enter the 6-digit verification code.");
      setLoading(false);
      return;
    }

    if (!/^[0-9]{6}$/.test(token)) {
      setError("Verification code must be 6 digits.");
      setLoading(false);
      return;
    }

    setError("");
    setLoading(false);
    onNext();

    // Uncomment when ready for real verification
    // const isValid = await verifyPhone(phoneNumber, token);
    // if (isValid) {
    //   onNext();
    // } else {
    //   setError("Invalid verification code.");
    // }
  };

  const handleResend = async () => {
    if (timer > 0) return; // Prevent resend if timer is still running

    setLoading(true);
    setError("");
    try {
      // await resendPhoneVerification(phoneNumber);
      Toast.show({
        type: "success",
        text1: "Code resent successfully!",
      });

      setToken("");
      setTimer(105); // Reset timer to 1:45
      setLoading(false);
      inputRef.current?.focus();
    } catch (err: any) {
      setError(err.message);
      Toast.show({
        type: "error",
        text1: "Failed to resend code.",
      });
      setLoading(false);
    }
  };

  // Keep focus on the hidden input when user taps the OTP area
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const totalSteps = role === "owner" ? 7 : 4;

  return (
    <View className="flex-1 justify-between bg-surface px-6 pb-8 pt-12">
      <View>
        {/* Back Button */}
        <TouchableOpacity onPress={onBack} className="mb-6">
          <Text className="text-base font-bold text-[#4B5E6D]">Back</Text>
        </TouchableOpacity>

        {/* Progress Indicator (Step 2) */}
        <View className="mb-8 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View className="h-2 w-4 rounded-full bg-primary-dark" />
            <View className="h-2 w-6 rounded-full bg-primary-dark" />
            <View className="h-2 w-28 rounded-full bg-primary" />
            <View className="h-2 w-4 rounded-full bg-gray-300" />
          </View>
          <Text className="text-sm font-semibold text-gray-500">
            Step 3 of {totalSteps}
          </Text>
        </View>

        {/* Headers */}
        <View className="mb-6">
          <Text className="mb-2 text-3xl font-extrabold text-[#1a2b3c]">
            Verify Your Phone
          </Text>
          <Text className="text-base text-gray-500">
            We sent a code to +63 {phoneNumber}
          </Text>
        </View>

        {/* OTP Input Container */}
        <Pressable onPress={focusInput} className="mb-6 h-16 justify-center">
          <View className="flex-row justify-between">
            {/* Generate 6 boxes */}
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const digit = token[index] || "";
              // Highlight the next empty box
              const isCurrent = index === token.length;

              return (
                <View
                  key={index}
                  className={`h-14 w-12 items-center justify-center rounded-xl border bg-white ${
                    isCurrent ? "border-2 border-primary" : "border-gray-200"
                  }`}
                >
                  <Text className="text-2xl font-bold text-[#1a2b3c]">
                    {digit}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Hidden Input field overlaid to capture keyboard events */}
          <TextInput
            ref={inputRef}
            value={token}
            onChangeText={setToken}
            maxLength={6}
            keyboardType="number-pad"
            autoFocus
            className="absolute h-full w-full opacity-0"
          />
        </Pressable>

        {error ? (
          <Text className="mb-4 text-center text-sm font-semibold text-red-500">
            {error}
          </Text>
        ) : null}

        {/* Resend Link */}
        <View className="flex-row justify-center">
          <Text className="text-sm text-gray-500">
            Didn't receive the code?{" "}
          </Text>
          <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
            <Text
              className={`text-sm font-bold ${
                timer > 0 ? "text-primary" : "text-primary"
              }`}
            >
              Resend Code {timer > 0 ? `(${formattedTimer})` : ""}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Button */}
      <TouchableOpacity
        onPress={handleVerify}
        disabled={loading}
        className="mb-4 items-center rounded-xl bg-primary py-4"
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-lg font-bold text-white">Verify</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { useForm, FormProvider, FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@react-native-vector-icons/ionicons";

import {
  onboardingSchema,
  OnboardingFormData,
  OnboardingFormInput,
  Role,
  StepKey,
} from "@/features/onboarding/schema";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Step Components
import RoleStep from "@/features/onboarding/components/RoleStep";
import PersonalDetailsStep from "@/features/onboarding/components/PersonalDetailsStep";
import PhoneVerifyStep from "@/features/onboarding/components/PhoneVerifyStep";
import AddressStep from "@/features/onboarding/components/AddressStep";
import BusinessDetailsStep from "@/features/onboarding/components/BusinessDetailsStep";
import BusinessAddressStep from "@/features/onboarding/components/BusinessAddressStep";
import DoneStep from "@/features/onboarding/components/DoneStep";

// Sequence Configs
const CUSTOMER_STEPS: StepKey[] = ["PERSONAL", "PHONE_VERIFY", "ADDRESS"];
const OWNER_STEPS: StepKey[] = [
  "PERSONAL",
  "PHONE_VERIFY",
  "ADDRESS",
  "BUSINESS",
  "BUSINESS_ADDRESS",
];

const STEP_FIELDS: Record<StepKey, FieldPath<OnboardingFormInput>[]> = {
  PERSONAL: ["first_name", "last_name", "role"],
  PHONE_VERIFY: ["phone_number"],
  ADDRESS: ["business.address"],
  BUSINESS: ["business"],
  BUSINESS_ADDRESS: ["business.address"],
};

const STEP_COMPONENTS: Record<
  StepKey,
  React.ComponentType<{ onNext: () => void }>
> = {
  PERSONAL: PersonalDetailsStep,
  PHONE_VERIFY: PhoneVerifyStep,
  ADDRESS: AddressStep,
  BUSINESS: BusinessDetailsStep,
  BUSINESS_ADDRESS: BusinessAddressStep,
};

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const methods = useForm<OnboardingFormInput, any, OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    mode: "onChange",
    defaultValues: {
      role: "customer",
      first_name: "",
      last_name: "",
      phone_number: "",
    },
  });

  const [isRoleSelected, setIsRoleSelected] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const selectedRole: Role = methods.watch("role") || "customer";
  const currentSteps = selectedRole === "owner" ? OWNER_STEPS : CUSTOMER_STEPS;
  const totalFormSteps = currentSteps.length;
  const currentStepKey = currentSteps[stepIndex];
  const isLastStep = stepIndex === totalFormSteps - 1;

  const progress = ((stepIndex + 1) / totalFormSteps) * 100;

  const handleNext = async () => {
    const isValid = await methods.trigger(STEP_FIELDS[currentStepKey]);
    if (!isValid) return;

    if (isLastStep) {
      methods.handleSubmit(onSubmit)();
    } else {
      setStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    } else {
      setIsRoleSelected(false);
    }
  };

  const onSubmit = (data: OnboardingFormData) => {
    console.log("Submitting Onboarding Data:", data);
    setIsDone(true);
  };

  const CurrentStepComponent = STEP_COMPONENTS[currentStepKey];

  return (
    <FormProvider {...methods}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-primary-tint"
      >
        {/* Header & Progress Bar */}
        {isRoleSelected && !isDone && (
          <View className="px-6 pb-2 pt-14">
            <View className="mb-3 flex-row items-center justify-between">
              <Pressable
                onPress={handleBack}
                className="flex-row items-center gap-1 py-1 pr-3"
              >
                <Ionicons name="chevron-back" size={20} color="#1F2937" />
                <Text className="font-body-medium text-sm text-text-primary">
                  Back
                </Text>
              </Pressable>

              <Text className="font-body-medium text-xs text-text-muted">
                Step {stepIndex + 1} of {totalFormSteps}
              </Text>
            </View>

            <View className="h-1.5 w-full overflow-hidden rounded-full bg-border">
              <View
                className="h-full rounded-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </View>
          </View>
        )}

        {/* Dynamic Step View */}
        <ScrollView
          contentContainerClassName="flex-grow px-6 pb-6"
          contentContainerStyle={{
            // Add safe area inset dynamically when header is NOT rendered
            paddingTop: !isRoleSelected ? Math.max(insets.top + 16, 32) : 16,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {!isRoleSelected ? (
            <RoleStep onNext={() => setIsRoleSelected(true)} />
          ) : isDone ? (
            <DoneStep />
          ) : (
            <CurrentStepComponent onNext={handleNext} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </FormProvider>
  );
}

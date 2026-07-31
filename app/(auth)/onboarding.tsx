// app/(auth)/onboarding.tsx
import { useState } from "react";
import { View } from "react-native";
import { useOnboardingStore } from "@/features/onboarding/store/onBoardingStore";
import { useOnboarding } from "@/features/onboarding/hooks/useOnboarding";
import RoleStep from "@/features/onboarding/components/RoleStep";
import PersonalDetailsStep from "@/features/onboarding/components/PersonalDetailsStep";
import PhoneVerifyStep from "@/features/onboarding/components/PhoneVerifyStep";
import AddressStep from "@/features/onboarding/components/AddressStep";
import BusinessDetailsStep from "@/features/onboarding/components/BusinessDetailsStep";
import BusinessAddressStep from "@/features/onboarding/components/BusinessAddressStep";
import DoneStep from "@/features/onboarding/components/DoneStep";
import ServicesStep from "@/features/onboarding/components/ServicesStep";
import Toast from "react-native-toast-message";

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const role = useOnboardingStore((state) => state.role);
  const { submitOnboarding, isSubmitting } = useOnboarding();

  const handleNext = async () => {
    console.log("continuing");
    if (step === 4 && role === "customer") {
      try {
        await submitOnboarding();
        setStep(8);
      } catch (error) {
        console.error("Onboarding submission error:", error);
        Toast.show({
          type: "error",
          text1: "Failed to complete onboarding",
        });
      }
    } else if (step === 7 && role === "owner") {
      try {
        await submitOnboarding();
        setStep(8);
      } catch (error) {
        console.error("Onboarding submission error:", error);
        Toast.show({
          type: "error",
          text1: "Failed to complete onboarding",
        });
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <View style={{ flex: 1 }}>
      {step === 1 && <RoleStep onNext={handleNext} />}
      {step === 2 && (
        <PersonalDetailsStep onNext={handleNext} onBack={handleBack} />
      )}
      {step === 3 && (
        <PhoneVerifyStep onNext={handleNext} onBack={handleBack} />
      )}
      {step === 4 && <AddressStep onNext={handleNext} onBack={handleBack} />}
      {step === 5 && (
        <BusinessDetailsStep onNext={handleNext} onBack={handleBack} />
      )}
      {step === 6 && (
        <BusinessAddressStep onNext={handleNext} onBack={handleBack} />
      )}
      {step === 7 && <ServicesStep onNext={handleNext} onBack={handleBack} />}
      {step === 8 && <DoneStep />}
    </View>
  );
}

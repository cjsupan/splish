import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import {
  PersonalDetailsFormInput,
  personalDetailsSchema,
  PersonalDetailsFormData,
} from "@/features/onboarding/schema";
import { FormInput } from "@/components/ui/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnboardingStore } from "../store/onBoardingStore";
import { colors } from "@/constants/design/theme";

interface PersonalDetailsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PersonalDetailsStep({
  onNext,
  onBack,
}: PersonalDetailsStepProps) {
  const { personal, setPersonal, role } = useOnboardingStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PersonalDetailsFormInput, any, PersonalDetailsFormData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      first_name: personal.first_name || "",
      last_name: personal.last_name || "",
      phone: personal.phone || "",
    },
    mode: "onChange",
  });

  const handleContinue = (data: PersonalDetailsFormData) => {
    setPersonal(data);
    onNext();
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
            <View className="h-2 w-6 rounded-full bg-primary-dark" />
            <View className="h-2 w-28 rounded-full bg-primary" />
            <View className="h-2 w-4 rounded-full bg-gray-300" />
            <View className="h-2 w-4 rounded-full bg-gray-300" />
          </View>
          <Text className="text-sm font-semibold text-gray-500">
            Step 2 of {totalSteps}
          </Text>
        </View>

        {/* Header */}
        <View className="mb-8">
          <Text className="mb-2 text-3xl font-extrabold text-[#1a2b3c]">
            Personal Details
          </Text>
          <Text className="text-base text-gray-500">
            Please provide your real information.
          </Text>
        </View>

        <View className="space-y-4">
          <FormInput
            name="first_name"
            label="First Name"
            control={control}
            placeholder="Sarah"
            placeholderTextColor={colors.textMuted || "#9ca3af"}
            keyboardType="default"
            autoCapitalize="words"
            inputWrapperClassName="bg-white border border-gray-200 rounded-xl"
          />

          <FormInput
            name="last_name"
            label="Last Name"
            control={control}
            placeholder="Mercedes"
            placeholderTextColor={colors.textMuted || "#9ca3af"}
            keyboardType="default"
            autoCapitalize="words"
            inputWrapperClassName="bg-white border border-gray-200 rounded-xl"
          />

          <FormInput
            name="phone"
            label="Phone Number"
            control={control}
            placeholder="0917 555 4321"
            placeholderTextColor={colors.textMuted || "#9ca3af"}
            keyboardType="phone-pad"
            inputWrapperClassName="bg-white border border-gray-200 rounded-xl"
          />
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        onPress={handleSubmit(handleContinue)}
        disabled={isSubmitting}
        className="mb-4 items-center rounded-xl bg-primary py-4"
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-lg font-bold text-white">Next</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

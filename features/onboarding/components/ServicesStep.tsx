import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Switch,
  ActivityIndicator,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/ui/FormInput";
import { Select } from "@/components/ui/Select";
import { Controller, useForm } from "react-hook-form";
import { useOnboardingStore } from "../store/onBoardingStore";
import {
  ServiceItemFormData,
  ServiceItemFormInput,
  serviceItemSchema,
} from "../schema";
import Ionicons from "@react-native-vector-icons/ionicons";
import { colors } from "@/constants/design/theme";
import { UnitOption } from "../constant";
import { ServiceCard } from "./ServiceCard";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

interface ServicesStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ServicesStep({ onBack, onNext }: ServicesStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { role, addService, removeService, services } = useOnboardingStore();
  const { control, handleSubmit, reset, setValue } = useForm<
    ServiceItemFormInput,
    any,
    ServiceItemFormData
  >({
    resolver: zodResolver(serviceItemSchema),
    defaultValues: {
      name: "",
      description: "",
      unit: "kg",
      price: 0,
      min_qty: 0,
      is_available: true,
    },
  });

  const addAnotherService = (data: ServiceItemFormData) => {
    setIsLoading(true);
    addService(data);
    reset();
    setIsLoading(false);
    Toast.show({
      type: "success",
      text1: "Service added successfully",
    });
  };

  const handleNext = () => {
    if (services.length === 0) {
      Toast.show({
        type: "error",
        text1: "Please add at least one service",
      });
    } else {
      onNext();
    }
  };
  const totalSteps = role === "owner" ? 7 : 4;
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-surface">
      <View className="flex-1 gap-8 px-6 pb-4">
        {/* Back Button */}
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={onBack}>
            <Text className="font-display-medium text-base text-primary-dark">
              Back
            </Text>
          </TouchableOpacity>

          {/* Progress Indicator (Step 2) */}

          <View className="flex-row items-center gap-2">
            <View className="h-2 w-2 rounded-full bg-primary-dark" />
            <View className="h-2 w-2 rounded-full bg-primary-dark" />
            <View className="h-2 w-2 rounded-full bg-primary-dark" />
            <View className="h-2 w-2 rounded-full bg-primary-dark" />
            <View className="h-2 w-2 rounded-full bg-primary-dark" />
            <View className="h-2 w-4 rounded-full bg-primary-dark" />
            <View className="h-2 w-12 rounded-full bg-primary" />
          </View>
          <Text className="font-body-semibold text-sm text-gray-500">
            Step 7/{totalSteps}
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View className="mb-8">
            <Text className="font-body-extrabold text-3xl text-text-primary">
              Add Your Services
            </Text>
            <Text className="text-base text-text-muted">
              Add at least one service to get started.
            </Text>
          </View>
          {/* Services Card */}
          <View className="mb-6 gap-2">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                onRemove={() => removeService(index)}
              />
            ))}
          </View>
          <View className="items-center gap-2">
            <View className="min-h-80 w-full gap-3 rounded-lg border border-primary p-4">
              {/* Service Form */}
              <FormInput
                control={control}
                name="name"
                label="Service Name"
                placeholder="e.g. Wash, Dry & Fold"
                placeholderTextColor={colors.textMuted || "#9ca3af"}
                inputWrapperClassName="bg-white border border-gray-200 rounded-lg"
              />

              <FormInput
                control={control}
                name="description"
                label="Service Description"
                placeholder="e.g. Basic wash with detergent"
                placeholderTextColor={colors.textMuted || "#9ca3af"}
                multiline
                numberOfLines={4}
                inputWrapperClassName="bg-white border border-gray-200 rounded-lg h-28 items-start"
                style={{ textAlignVertical: "top" }}
              />

              <View className="flex-row items-center justify-between gap-4 align-middle">
                <View className="flex-1">
                  <FormInput
                    control={control}
                    name="price"
                    label="Price"
                    placeholder="e.g. 150"
                    placeholderTextColor={colors.textMuted || "#9ca3af"}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setValue("price", parseFloat(text) || 0)
                    }
                    inputWrapperClassName="rounded-lg"
                  />
                </View>
                <View className="flex-1">
                  <Controller
                    control={control}
                    name="unit"
                    render={({ field: { value, onChange } }) => (
                      <Select<string>
                        label="Unit"
                        placeholder="Select Unit"
                        title="Select Unit"
                        options={UnitOption}
                        value={value}
                        onChange={onChange}
                        className="mb-0"
                      />
                    )}
                  />
                </View>
              </View>

              <FormInput
                control={control}
                name="min_qty"
                label="Minimum Quantity"
                placeholder="e.g. 1"
                placeholderTextColor={colors.textMuted || "#9ca3af"}
                keyboardType="numeric"
                onChangeText={(text) =>
                  setValue("min_qty", parseInt(text) || 0)
                }
                inputWrapperClassName="rounded-lg"
              />

              <View className="my-4 flex-row items-center justify-between">
                <Text className="text-base font-bold text-text-primary">
                  Available
                </Text>
                <Controller
                  control={control}
                  name="is_available"
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
            {/* Add another service button */}
            <TouchableOpacity
              onPress={handleSubmit(addAnotherService)}
              className="mb-4 w-full flex-row items-center justify-center gap-2 rounded-md border border-primary py-3"
            >
              <Ionicons name="add" size={24} color={colors.primary} />
              <Text className="text-md font-bold text-primary">
                Add Another Service
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={handleNext}
          disabled={isLoading || services.length === 0}
          className={`mb-6 mt-4 items-center rounded-lg py-4 ${services.length === 0 ? "bg-gray-200" : "bg-primary"}`}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="font-body text-lg font-bold text-white">
              Continue
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

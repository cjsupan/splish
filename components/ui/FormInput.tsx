import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import {
  Controller,
  Control,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { colors } from "@/constants/design/theme";

interface FormInputProps<TFieldValues extends FieldValues> extends Omit<
  TextInputProps,
  "name"
> {
  name: FieldPath<TFieldValues>;
  control?: Control<TFieldValues>;
  label?: string;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  iconColor?: string;
  rightElement?: React.ReactNode;
  containerClassName?: string;
  inputWrapperClassName?: string;
}

export function FormInput<TFieldValues extends FieldValues = FieldValues>({
  name,
  control: controlProp,
  label,
  iconName,
  iconColor = colors.secondary,
  rightElement,
  containerClassName = "",
  inputWrapperClassName = "",
  className = "",
  placeholderTextColor = colors.textMuted,
  ...textInputProps
}: FormInputProps<TFieldValues>) {
  const formContext = useFormContext<TFieldValues>();
  const control = controlProp ?? formContext?.control;

  if (!control) {
    throw new Error(
      "FormInput must either be passed a `control` prop or rendered inside a `<FormProvider>`.",
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View className={`gap-1 ${containerClassName}`}>
          {label && (
            <Text className="font-body-medium text-sm text-text-primary">
              {label}
            </Text>
          )}

          <View
            className={`h-14 flex-row items-center gap-3 rounded-2xl border px-4 ${
              error?.message ? "border-danger" : "border-border"
            } ${inputWrapperClassName}`}
          >
            {iconName && (
              <Ionicons name={iconName} size={18} color={iconColor} />
            )}

            <TextInput
              value={value != null ? String(value) : ""}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor={placeholderTextColor}
              className={`flex-1 font-body text-base text-text-primary ${className}`}
              {...textInputProps}
            />

            {rightElement}
          </View>

          {error?.message && (
            <Text className="font-body text-xs text-danger">
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}

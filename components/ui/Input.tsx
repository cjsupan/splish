import { View, Text, TextInput, TextInputProps } from "react-native";
import { colors } from "@/constants/design/theme";

interface InputProps extends TextInputProps {
  label?: string;
  hint?: string;
  error?: string;
}

export function Input({ label, hint, error, ...props }: InputProps) {
  return (
    <View className="gap-1.5">
      {label && <Text className="text-ink text-sm font-semibold">{label}</Text>}

      <TextInput
        {...props}
        placeholderTextColor={colors.textMuted}
        className={[
          "text-ink rounded-xl border bg-surface px-4 py-3.5 font-sans text-base",
          error ? "border-error" : "border-border",
        ].join(" ")}
        style={{ fontFamily: "PlusJakartaSans_400Regular" }}
      />

      {error && <Text className="text-error font-sans text-xs">{error}</Text>}
      {hint && !error && (
        <Text className="text-ink-secondary font-sans text-xs">{hint}</Text>
      )}
    </View>
  );
}

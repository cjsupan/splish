import { ReactNode } from "react";
import { Text, View } from "react-native";

type BadgeVariant = "primary" | "success" | "warning" | "danger" | "neutral";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary-tint text-primary-dark",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger/15 text-danger",
  neutral: "bg-surface-muted text-text-muted",
};

export function Badge({
  children,
  variant = "neutral",
  className = "",
}: BadgeProps) {
  const [backgroundClass, textClass] = variantClasses[variant].split(" ");

  return (
    <View className={`rounded-sm px-2 py-1 ${backgroundClass} ${className}`}>
      <Text className={`font-body-bold text-xs ${textClass}`}>{children}</Text>
    </View>
  );
}

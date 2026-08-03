import { ReactNode } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
  textClassName?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary",
  secondary: "bg-primary-dark",
  outline: "border border-primary bg-transparent",
  ghost: "bg-transparent",
};

const textVariantClasses: Record<ButtonVariant, string> = {
  primary: "text-white",
  secondary: "text-white",
  outline: "text-primary",
  ghost: "text-primary",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2",
  md: "px-5 py-3",
  lg: "px-6 py-4",
};

const textSizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  textClassName = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      className={`items-center justify-center rounded-md ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${isDisabled ? "opacity-50" : ""} ${className}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "outline" || variant === "ghost" ? undefined : "#FFFFFF"
          }
        />
      ) : (
        <Text
          className={`font-body-bold ${textVariantClasses[variant]} ${textSizeClasses[size]} ${textClassName}`}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

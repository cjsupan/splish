import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface PillProps extends TouchableOpacityProps {
  children: ReactNode;
  selected?: boolean;
  className?: string;
  textClassName?: string;
}

export function Pill({
  children,
  selected = false,
  disabled,
  className = "",
  textClassName = "",
  ...props
}: PillProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      className={`rounded-xl px-4 py-2 ${
        selected ? "bg-primary" : "border border-border bg-transparent"
      } ${disabled ? "opacity-50" : ""} ${className}`}
      {...props}
    >
      <Text
        className={`font-body-bold ${
          selected ? "text-white" : "text-text-primary"
        } ${textClassName}`}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

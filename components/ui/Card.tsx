import { ReactNode } from "react";
import { View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <View
      className={`rounded-lg border border-border bg-surface shadow-sm shadow-border ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}

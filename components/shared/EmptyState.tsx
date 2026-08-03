import { ReactNode } from "react";
import { Text, View } from "react-native";
import Lucide from "@react-native-vector-icons/lucide";

import { colors } from "@/constants/design/theme";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon = "inbox",
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <View
      className={`items-center justify-center rounded-lg border border-border bg-surface px-6 py-10 ${className}`}
    >
      <View className="mb-4 rounded-full bg-primary-tint p-4">
        <Lucide name={icon as never} size={28} color={colors.primaryDark} />
      </View>

      <Text className="text-center font-body-bold text-base text-text-primary">
        {title}
      </Text>

      {description ? (
        <Text className="font-body-regular mt-2 text-center text-sm text-text-muted">
          {description}
        </Text>
      ) : null}

      {action ? <View className="mt-5">{action}</View> : null}
    </View>
  );
}

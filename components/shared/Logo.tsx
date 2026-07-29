import { Image } from "expo-image";
import { colors } from "@/constants/design/theme";

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 32 }: LogoProps) {
  return (
    <Image
      source={require("@/assets/icon.svg")}
      style={{
        width: size,
        height: size,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      }}
    />
  );
}

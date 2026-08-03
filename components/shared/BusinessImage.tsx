import { Image, ImageProps } from "expo-image";
import { cssInterop } from "nativewind";

cssInterop(Image, {
  className: "style",
});

interface BusinessImageProps extends Omit<ImageProps, "source"> {
  uri?: string | null;
  className?: string;
}

export function BusinessImage({
  uri,
  className = "",
  contentFit = "cover",
  transition = 200,
  ...props
}: BusinessImageProps) {
  return (
    <Image
      source={uri ? { uri } : require("@/assets/icon.svg")}
      className={`bg-surface ${className}`}
      contentFit={contentFit}
      transition={transition}
      {...props}
    />
  );
}

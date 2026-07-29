import { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";
import { colors } from "../../constants/design/theme";

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.success,
        backgroundColor: colors.successBg,
        borderRadius: 12,
        marginHorizontal: 16,
        height: "auto",
        paddingVertical: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{
        fontFamily: "DMSansBold",
        fontSize: 14,
        color: colors.successText,
      }}
      text2Style={{
        fontFamily: "DMSans",
        fontSize: 12,
        color: colors.successText,
      }}
      text2NumberOfLines={3}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: colors.danger,
        backgroundColor: colors.dangerBg,
        borderRadius: 12,
        marginHorizontal: 16,
        height: "auto",
        paddingVertical: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{
        fontFamily: "DMSansBold",
        fontSize: 14,
        color: colors.dangerText,
      }}
      text2Style={{
        fontFamily: "DMSans",
        fontSize: 12,
        color: colors.dangerText,
      }}
      text2NumberOfLines={3}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.info,
        backgroundColor: colors.infoBg,
        borderRadius: 12,
        marginHorizontal: 16,
        height: "auto",
        paddingVertical: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{
        fontFamily: "DMSansBold",
        fontSize: 14,
        color: colors.infoText,
      }}
      text2Style={{
        fontFamily: "DMSans",
        fontSize: 12,
        color: colors.infoText,
      }}
      text2NumberOfLines={3}
    />
  ),
};

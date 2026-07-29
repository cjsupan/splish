import { tokens } from "./tokens";

export const colors = {
  primary: tokens.colors.primary.DEFAULT,
  primaryDark: tokens.colors.primary.dark,
  primaryLight: tokens.colors.primary.light,
  primaryTint: tokens.colors.primary.tint,
  primaryForeground: tokens.colors.primary.foreground,

  secondary: tokens.colors.secondary.DEFAULT,
  secondaryDark: tokens.colors.secondary.dark,
  secondaryLight: tokens.colors.secondary.light,

  accent: tokens.colors.accent.DEFAULT,
  accentForeground: tokens.colors.accent.foreground,

  background: tokens.colors.background,

  surface: tokens.colors.surface.DEFAULT,
  surfaceElevated: tokens.colors.surface.elevated,

  border: tokens.colors.border.DEFAULT,
  borderLight: tokens.colors.border.light,

  textPrimary: tokens.colors.text.primary,
  textSecondary: tokens.colors.text.secondary,
  textMuted: tokens.colors.text.muted,
  textInverted: tokens.colors.text.inverted,

  success: tokens.colors.success.DEFAULT,
  successBg: tokens.colors.success.bg,
  successText: tokens.colors.success.text,

  info: tokens.colors.info.DEFAULT,
  infoBg: tokens.colors.info.bg,
  infoText: tokens.colors.info.text,

  warning: tokens.colors.warning.DEFAULT,
  warningBg: tokens.colors.warning.bg,
  warningText: tokens.colors.warning.text,

  danger: tokens.colors.danger.DEFAULT,
  dangerBg: tokens.colors.danger.bg,
  dangerText: tokens.colors.danger.text,

  dark: {
    background: tokens.colors.dark.background,

    surface: tokens.colors.dark.surface.DEFAULT,
    surfaceElevated: tokens.colors.dark.surface.elevated,

    border: tokens.colors.dark.border.DEFAULT,
    borderLight: tokens.colors.dark.border.light,

    textPrimary: tokens.colors.dark.text.primary,
    textSecondary: tokens.colors.dark.text.secondary,
    textMuted: tokens.colors.dark.text.muted,
  },
};

export const fontFamily = tokens.fontFamily;
export const fontSize = tokens.fontSize;
export const spacing = tokens.spacing;
export const borderRadius = tokens.borderRadius;
export const fontWeight = tokens.fontWeight;

export const iconSize = tokens.iconSize;
export const buttonHeight = tokens.buttonHeight;
export const inputHeight = tokens.inputHeight;
export const avatarSize = tokens.avatarSize;
export const opacity = tokens.opacity;
export const duration = tokens.duration;
export const layout = tokens.layout;

export const shadow = {
  sm: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  md: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  lg: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },

  xl: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 12,
  },
};

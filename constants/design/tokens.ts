export const tokens = {
  colors: {
    primary: {
      DEFAULT: "#38A3A5",
      dark: "#22577A",
      light: "#57CC99",
      tint: "#E0F2F1",
      foreground: "#FFFFFF",
    },

    secondary: {
      DEFAULT: "#2D3748",
      dark: "#1A202C",
      light: "#4A5568",
    },

    accent: {
      DEFAULT: "#FF7A59",
      foreground: "#FFFFFF",
    },

    background: "#F7FAFC",

    surface: {
      DEFAULT: "#FFFFFF",
      elevated: "#F8F9FA",
    },

    border: {
      DEFAULT: "#E2E8F0",
      light: "#EDF2F7",
    },

    text: {
      primary: "#1A202C",
      secondary: "#4A5568",
      muted: "#718096",
      inverted: "#F7FAFC",
    },

    success: {
      DEFAULT: "#38B2AC",
      bg: "#E6FFFA",
      text: "#234E52",
    },

    info: {
      DEFAULT: "#3182CE",
      bg: "#EBF8FF",
      text: "#2B6CB0",
    },

    warning: {
      DEFAULT: "#DD6B20",
      bg: "#FFFAF0",
      text: "#9C4221",
    },

    danger: {
      DEFAULT: "#E53E3E",
      bg: "#FFF5F5",
      text: "#9B2C2C",
    },

    dark: {
      background: "#0F172A",

      surface: {
        DEFAULT: "#1E293B",
        elevated: "#334155",
      },

      border: {
        DEFAULT: "#334155",
        light: "#475569",
      },

      text: {
        primary: "#F8FAFC",
        secondary: "#CBD5E1",
        muted: "#94A3B8",
      },
    },
  },

  fontFamily: {
    display: "Geist_400Regular",
    displayMedium: "Geist_500Medium",
    displaySemibold: "Geist_600SemiBold",
    displayBold: "Geist_700Bold",
    displayExtraBold: "Geist_800ExtraBold",

    body: "PlusJakartaSans_400Regular",
    bodyMedium: "PlusJakartaSans_500Medium",
    bodySemibold: "PlusJakartaSans_600SemiBold",
    bodyBold: "PlusJakartaSans_700Bold",

    mono: "SpaceMono_400Regular",
    monoBold: "SpaceMono_700Bold",
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    md: 18,
    lg: 20,
    xl: 24,
    "2xl": 30,
    "3xl": 36,
    "4xl": 48,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    "2xl": 32,
    "3xl": 40,
    "4xl": 48,
    "5xl": 64,
  },

  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 24,
    "3xl": 28,
    full: 9999,
  },

  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },

  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  },

  buttonHeight: {
    sm: 40,
    md: 48,
    lg: 56,
  },

  inputHeight: {
    sm: 40,
    md: 48,
    lg: 56,
  },

  avatarSize: {
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72,
  },

  opacity: {
    disabled: 0.4,
    overlay: 0.6,
  },

  duration: {
    fast: 150,
    normal: 250,
    slow: 400,
  },

  layout: {
    headerHeight: 56,
    tabBarHeight: 72,
    bottomSheetRadius: 24,
  },
} as const;

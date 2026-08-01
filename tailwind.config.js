const { tokens } = require("./constants/design/tokens");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
    "./providers/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: tokens.colors,

      fontFamily: {
        display: [tokens.fontFamily.display],
        "display-medium": [tokens.fontFamily.displayMedium],
        "display-semibold": [tokens.fontFamily.displaySemibold],
        "display-bold": [tokens.fontFamily.displayBold],
        "display-extrabold": [tokens.fontFamily.displayExtraBold],

        body: [tokens.fontFamily.body],
        "body-medium": [tokens.fontFamily.bodyMedium],
        "body-semibold": [tokens.fontFamily.bodySemibold],
        "body-bold": [tokens.fontFamily.bodyBold],
        "body-extrabold": [tokens.fontFamily.bodyExtrabold],

        inter: [tokens.fontFamily.inter],
        "inter-medium": [tokens.fontFamily.interMedium],
        "inter-semibold": [tokens.fontFamily.interSemibold],
        "inter-bold": [tokens.fontFamily.interBold],

        mono: [tokens.fontFamily.mono],
        "mono-bold": [tokens.fontFamily.monoBold],
      },

      fontSize: Object.fromEntries(
        Object.entries(tokens.fontSize).map(([key, value]) => [
          key,
          [
            `${value}px`,
            {
              lineHeight: `${Math.round(value * 1.5)}px`,
            },
          ],
        ]),
      ),

      spacing: Object.fromEntries(
        Object.entries(tokens.spacing).map(([key, value]) => [
          key,
          `${value}px`,
        ]),
      ),

      borderRadius: Object.fromEntries(
        Object.entries(tokens.borderRadius).map(([key, value]) => [
          key,
          `${value}px`,
        ]),
      ),

      opacity: tokens.opacity,

      zIndex: {
        base: "1",
        dropdown: "100",
        sticky: "200",
        overlay: "500",
        modal: "1000",
        toast: "1100",
      },

      transitionDuration: Object.fromEntries(
        Object.entries(tokens.duration).map(([key, value]) => [
          key,
          `${value}ms`,
        ]),
      ),

      minHeight: Object.fromEntries(
        Object.entries(tokens.buttonHeight).map(([key, value]) => [
          `button-${key}`,
          `${value}px`,
        ]),
      ),

      height: {
        ...Object.fromEntries(
          Object.entries(tokens.buttonHeight).map(([key, value]) => [
            `button-${key}`,
            `${value}px`,
          ]),
        ),

        ...Object.fromEntries(
          Object.entries(tokens.inputHeight).map(([key, value]) => [
            `input-${key}`,
            `${value}px`,
          ]),
        ),

        ...Object.fromEntries(
          Object.entries(tokens.avatarSize).map(([key, value]) => [
            `avatar-${key}`,
            `${value}px`,
          ]),
        ),

        ...Object.fromEntries(
          Object.entries(tokens.iconSize).map(([key, value]) => [
            `icon-${key}`,
            `${value}px`,
          ]),
        ),
      },

      width: {
        ...Object.fromEntries(
          Object.entries(tokens.avatarSize).map(([key, value]) => [
            `avatar-${key}`,
            `${value}px`,
          ]),
        ),

        ...Object.fromEntries(
          Object.entries(tokens.iconSize).map(([key, value]) => [
            `icon-${key}`,
            `${value}px`,
          ]),
        ),
      },
    },
  },

  plugins: [],
};

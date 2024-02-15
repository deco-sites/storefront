import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      colors: {
        chatPrimary: "var(--primary-color-hex)",
        chatSecondary: "var(--secondary-color-hex)",
        chatTertiary: "var(--tertiary-color-hex)",
        chatLogo: "var(--logo-color-hex)",
        opaqueWhite: "var(--opaque-white)",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["hover"],
    },
  },
};

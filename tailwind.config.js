const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "2rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "2.5xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "3xl": ["2rem", { lineHeight: "3rem" }],
      "4xl": ["2.5rem", { lineHeight: "3rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    extend: {
      animation: {
        "fade-in": "fade-in 0.5s linear forwards",
        marquee: "marquee var(--marquee-duration) linear infinite",
        "spin-slow": "spin 4s linear infinite",
        "spin-slower": "spin 6s linear infinite",
        "spin-reverse": "spin-reverse 1s linear infinite",
        "spin-reverse-slow": "spin-reverse 4s linear infinite",
        "spin-reverse-slower": "spin-reverse 6s linear infinite",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      colors: ({ colors }) => ({
        primary: "#315b3f",
        secondary: "#f6f2ee",
        tertiary: "#888685",
        beige: {
          300: "#fbfaf8",
          400: "#f9f6f3",
          500: "#f6f2ee",
          dark: "#f5ecd6",
        },
        light: {
          50: "#ffffff",
          DEFAULT: "#fefefe",
        },
        dark: {
          400: "#666665",
          DEFAULT: "#252523",
          900: "#121211",
        },
        brown: {
          50: "#faf9f5",
          100: "#f5f2eb",
          200: "#e5dfce",
          300: "#d5cbb0",
          400: "#b6a474",
          DEFAULT: "#977d39",
          600: "#887133",
          700: "#715e2b",
          800: "#4a3d1c",
          dark: "#393837",
        },
        gray: {
          50: "#f9f9f9",
          100: "#f3f3f3",
          200: "#e1e1e1",
          300: "#cfcfce",
          400: "#acaaaa",
          500: "#888685",
          600: "#7a7978",
          700: "#666564",
          800: "#525050",
          900: "#434241",
        },
        green: {
          50: "#f5f7f5",
          100: "#eaefec",
          200: "#ccd6cf",
          300: "#adbdb2",
          400: "#6f8c79",
          500: "#315b3f",
          600: "#2c5239",
          700: "#25442f",
          800: "#1d3726",
          900: "#182d1f",
        },
      }),
      fontFamily: {
        sans: ["Poppins", "Inter", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        marquee: {
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        "spin-reverse": {
          to: {
            transform: "rotate(-360deg)",
          },
        },
      },
      maxWidth: {
        "2xl": "40rem",
      },
    },
  },
  plugins: [],
};

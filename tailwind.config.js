const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./client/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#000000", // Pure Black Background
        foreground: "#ffffff", // Pure White text
        primary: {
          DEFAULT: "#00ff41", // Terminal Green
          50: "#f0fff4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#00ff41",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#1a1a1a", // Dark Gray
          50: "#f8f8f8",
          100: "#f0f0f0",
          200: "#e4e4e4",
          300: "#d1d1d1",
          400: "#b4b4b4",
          500: "#9a9a9a",
          600: "#818181",
          700: "#6a6a6a",
          800: "#5a5a5a",
          900: "#1a1a1a",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#0f0f0f", // Almost Black
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#0f0f0f",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ff4444", // Terminal Red
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#ff4444",
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "#262626",
          foreground: "#a3a3a3",
        },
        popover: {
          DEFAULT: "#0f0f0f",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#0f0f0f",
          foreground: "#ffffff",
        },
        // Score colors - Minimal Monochrome
        score: {
          excellent: "#059669", // Dark Green 70+
          good: "#6B7280", // Gray 40-70
          poor: "#DC2626", // Red <40
        },
      },
      fontFamily: {
        heading: ["JetBrains Mono", "Consolas", "Monaco", "monospace"],
        body: ["JetBrains Mono", "Consolas", "Monaco", "monospace"],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      boxShadow: {
        'minimal': '0 0 10px rgba(0, 255, 65, 0.1), 0 0 5px rgba(0, 255, 65, 0.05)',
        'minimal-lg': '0 0 15px rgba(0, 255, 65, 0.15), 0 0 8px rgba(0, 255, 65, 0.08)',
        'minimal-xl': '0 0 25px rgba(0, 255, 65, 0.2), 0 0 12px rgba(0, 255, 65, 0.1)',
        'terminal': '0 0 20px rgba(0, 255, 65, 0.3)',
        'glow': '0 0 30px rgba(0, 255, 65, 0.4)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "terminal-blink": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        "matrix-rain": {
          "0%": { transform: "translateY(-100vh)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200vh)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "terminal-blink": "terminal-blink 1s infinite",
        "matrix-rain": "matrix-rain 3s linear infinite",
        "scan-line": "scan-line 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

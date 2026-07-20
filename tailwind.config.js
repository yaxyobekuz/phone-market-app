/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#2563eb", foreground: "#ffffff" },
        background: "#f8fafc",
        foreground: "#0f172a",
        card: "#ffffff",
        muted: { DEFAULT: "#f1f5f9", foreground: "#64748b" },
        border: "#e2e8f0",
        destructive: { DEFAULT: "#ef4444", foreground: "#ffffff" },
        success: { DEFAULT: "#16a34a", foreground: "#ffffff" },
        warning: { DEFAULT: "#f59e0b", foreground: "#ffffff" },
      },
    },
  },
  plugins: [],
};

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f7f5ff",
          100: "#ede8ff",
          200: "#d8ccff",
          300: "#bdabff",
          400: "#9d78ff",
          500: "#7f4cff",
          600: "#6835e6",
          700: "#522bba",
          800: "#432593",
          900: "#3a2178",
        },
      },
      boxShadow: {
        soft: "0 24px 60px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      serif: ["Publico", ...defaultTheme.fontFamily.serif],
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        nctcOrange: {
          100: colors.violet[500],
          // 100: "hsl(17, 61%, 54%)",
          20: colors.gray[300],
          // 20: "hsla(17, 61%, 54%, .2)",
        },
        nctcBrown: {
          100: colors.gray[700],
          // 100: "#5F5450",
        },
        nctcWhite: {
          100: colors.violet[100],
          // 100: "#FDFAF4",
        },
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};

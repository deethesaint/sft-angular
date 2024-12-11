/** @type {import('tailwindcss').Config} */

/** generates a map of sizes from min to max e.g. {'1px':'1px',..., '60px':'60px'} */
function genPxSizeMap(min, max) {
  const sizes = {};
  for (let size = min; size <= max; size++) {
    const sizeToAdd = `${size}px`;
    sizes[sizeToAdd] = sizeToAdd;
  }
  return sizes;
}
module.exports = {
  prefix: "tw-",
  important: true,
  darkMode: "selector",
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "100%",
        "2xl": "100%",
      },
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      sky: "#a3e4ff",
      link: "#1484b2",
      wind: "#def6ff"
    },
    fontFamily: {
      "roboto-black": ["Roboto-Black", "sans-serif"],
      "roboto-bold": ["Roboto-Bold", "sans-serif"],
      "roboto-light": ["Roboto-Light", "sans-serif"],
      "roboto-medium": ["Roboto-Medium", "sans-serif"],
      "roboto-regular": ["Roboto-Regular", "sans-serif"],
      "roboto-thin": ["Roboto-Thin", "sans-serif"],
    },
    screens: {
      // default: 0 <-> 479 // portrait mobile // fluid width
      sm: "480px", // landscape mobile // fixed width // same design as portrait mobile
      md: "600px", // tablet // fixed width
      lg: "1014px", // laptop // fixed width
      xl: "1336px", // desktop // fixed width
    },
    extend: {
      fontSize: genPxSizeMap(1, 150),
      spacing: genPxSizeMap(1, 300),
      borderRadius: genPxSizeMap(1, 150),
    },
  },
  plugins: [],
};

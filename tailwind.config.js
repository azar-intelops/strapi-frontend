/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    // screens: {
    //   sm: '480px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1440px',
    // },
    colors: {
      // 'blue': '#1fb6ff',
      // 'pink': '#ff49db',
      // 'orange': '#ff7849',
      // 'green': '#13ce66',
      // 'gray-dark': '#273444',
      // 'gray': '#8492a6',
      // 'gray-light': '#d3dce6',
      primary: "#3B71CA",
    },
    // fontFamily: {
    //   sans: ['Graphik', 'sans-serif'],
    //   serif: ['Merriweather', 'serif'],
    // },
    extend: {
      backgroundImage: {
        intelops: "url('/intelops.png')",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      // dropShadow: {
      //   '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
      //   '4xl': [
      //     '0 35px 35px rgba(0, 0, 0, 0.25)',
      //     '0 45px 65px rgba(0, 0, 0, 0.15)'
      //   ]
      // }
    },
  },
  plugins: [require("flowbite/plugin")],
});

import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        dark_bg: '#1f2937',
        dark_text: '#f3f4f6',
        orange_univerdog: "#ff5a1f",
        jaune_univerdog_01: "#fbbf24",
        
        nav_trans_univerdog: "rgba(208, 202, 202, 0.12)",
        ap_header_univerdog: "rgb(47 47 49 / 65%)",
      },
    },
  },
  plugins: [
    // ...
    flowbite.plugin(),
  ],
};

import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          DEFAULT: "rgb(255, 255, 255)",
          2: "rgb(247, 249, 249)",
          3: "rgb(239, 243, 244)",
          hover: {
            DEFAULT: "rgba(15, 20, 25, 0.1)",
            2: "rgba(0, 0, 0, 0.03)",
          },
          active: {
            DEFAULT: "rgba(15, 20, 25, 0.2)",
            2: "rgba(0, 0, 0, 0.06)",
          },
          text: {
            DEFAULT: "rgb(15, 20, 25)",
            2: "rgb(83, 100, 113)",
          },
          border: {
            DEFAULT: "rgb(239, 243, 244)",
            2: "rgb(207, 217, 222)",
          },
        },
        dark: {
          DEFAULT: "rgb(0, 0, 0)",
          2: "rgb(22, 24, 28)",
          3: "rgb(32, 35, 39)",
          hover: {
            DEFAULT: "rgba(231, 233, 234, 0.1)",
            2: "rgba(255, 255, 255, 0.03)",
          },
          active: {
            DEFAULT: "rgba(231, 233, 234, 0.2)",
            2: "rgba(255, 255, 255, 0.06)",
          },
          text: {
            DEFAULT: "rgb(231, 233, 234)",
            2: "rgb(113, 118, 123)",
          },
          border: {
            DEFAULT: "rgb(47, 51, 54)",
            2: "rgb(83, 100, 113)",
          },
        },
        dim: {
          DEFAULT: "rgb(21, 32, 43)",
          2: "rgb(30, 39, 50)",
          3: "rgb(39, 51, 64)",
          hover: {
            DEFAULT: "rgba(247, 249, 249, 0.1)",
            2: "rgba(255, 255, 255, 0.03)",
          },
          active: {
            DEFAULT: "rgba(247, 249, 249, 0.2)",
            2: "rgba(255, 255, 255, 0.06)",
          },
          text: {
            DEFAULT: "rgb(247, 249, 249)",
            2: "rgb(139, 152, 165)",
          },
          border: {
            DEFAULT: "rgb(56, 68, 77)",
            2: "rgb(83, 100, 113)",
          },
        },
        accent: "rgba(var(--accent-color), <alpha-value>)",
      },
      transitionDuration: {
        DEFAULT: "250ms",
      },
      screens: {
        xs: "500px",
      },
      boxShadow: {
        "light-sh":
          "rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px",
        "dark-sh":
          "rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px",
        "dim-sh":
          "rgba(136, 153, 166, 0.2) 0px 0px 15px, rgba(136, 153, 166, 0.15) 0px 0px 3px 1px",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("dim", "html.dim &");
    }),
  ],
};

/*
Accent colors:
  blue - rgb(29, 155, 240)
  yellow - rgb(255, 212, 0)
  pink - rgb(249, 24, 128)
  purple - rgb(120, 86, 255)
  orange - rgb(255, 122, 0)
  green - rgb(0, 186, 124)
*/

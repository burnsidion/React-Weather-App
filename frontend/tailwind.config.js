import { defineConfig } from "tailwindcss";
import daisyui from "daisyui";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
});

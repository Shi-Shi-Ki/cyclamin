import type { Config } from "tailwindcss"

declare const require: any

const config: Config & { daisyui?: any } = {
  content: ["../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "corporate"],
  },
}

export default config

import type { Config } from "tailwindcss"
import sharedConfig from "@repo/tailwind-config"

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  ...sharedConfig,
  content: [
    ...(sharedConfig.content as string[]),
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
}

export default config

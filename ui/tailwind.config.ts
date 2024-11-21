import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/shared/components/**/*.{js,ts,jsx,tsx,}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
}
export default config

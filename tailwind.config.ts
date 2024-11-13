import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    'src/ui/components/**/*.{js,ts,jsx,tsx}',
    'src/ui/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)', // Đảm bảo rằng các biến CSS này đã được định nghĩa
        foreground: 'var(--foreground)', // Đảm bảo rằng các biến CSS này đã được định nghĩa
      },
    },
  },
  plugins: [],
}

export default config

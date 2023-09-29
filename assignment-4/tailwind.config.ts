import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '30rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config

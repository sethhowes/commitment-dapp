import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'maya_blue': { DEFAULT: '#5cbdff', 100: '#002a45', 200: '#00538b', 300: '#007dd0', 400: '#16a2ff', 500: '#5cbdff', 600: '#7ccbff', 700: '#9dd8ff', 800: '#bee5ff', 900: '#def2ff' },
      'nyanza': { DEFAULT: '#d4f4dd', 100: '#134822', 200: '#259044', 300: '#42ce6a', 400: '#8ae1a3', 500: '#d4f4dd', 600: '#dbf6e3', 700: '#e4f8ea', 800: '#edfaf1', 900: '#f6fdf8' },
      'rusty_red': { DEFAULT: '#d62246', 100: '#2b070e', 200: '#560d1c', 300: '#82142a', 400: '#ad1b38', 500: '#d62246', 600: '#e34b69', 700: '#ea788f', 800: '#f1a5b4', 900: '#f8d2da' },
      'violet_(jtc)': { DEFAULT: '#4b1d3f', 100: '#0f060c', 200: '#1d0b19', 300: '#2c1125', 400: '#3b1731', 500: '#4b1d3f', 600: '#84336f', 700: '#ba4f9e', 800: '#d189be', 900: '#e8c4df' } }
  },
  plugins: [],
}
export default config

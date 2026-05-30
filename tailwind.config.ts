import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-body)', 'sans-serif'],
        heading: ['var(--font-heading)', 'serif'],
      },
      colors: {
        navy: {
          50: '#f0f3ff',
          100: '#e0e7ff',
          600: '#1e3a5f',
          700: '#172d4d',
          800: '#0f1f3b',
          900: '#0a1628',
        },
      },
    },
  },
  plugins: [],
};

export default config;

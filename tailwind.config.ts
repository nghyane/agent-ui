import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',
        primaryAccent: '#FFFFFF',
        brand: '#0066FF',
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8F9FA'
        },
        secondary: '#6B7280',
        border: 'rgba(var(--color-border-default))',
        accent: '#F3F4F6',
        muted: '#9CA3AF',
        destructive: '#EF4444',
        positive: '#10B981'
      },
      fontFamily: {
        inter: 'var(--font-inter)',
        noto: 'var(--font-noto-sans)'
      },
      borderRadius: {
        xl: '6px'
      }
    }
  },
  plugins: [tailwindcssAnimate]
} satisfies Config

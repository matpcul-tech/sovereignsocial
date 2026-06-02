import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        black: '#080808',
        carbon: '#111111',
        graphite: '#1a1a1a',
        amber: '#d4a017',
        'amber-dim': '#a07a10',
        cream: '#f0ead8',
        muted: '#666666',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
        syne: ['var(--font-syne)', 'sans-serif'],
      },
      borderColor: {
        amber: 'rgba(212, 160, 23, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config

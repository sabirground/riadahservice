/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['"Noto Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Optimized for Windows high-DPI displays - using rem units with tighter clamp ranges
        'display-xl': ['clamp(2.5rem, 1.8rem + 2.5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg': ['clamp(2rem, 1.5rem + 1.8vw, 3.25rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['clamp(1.625rem, 1.3rem + 1.2vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-sm': ['clamp(1.375rem, 1.15rem + 0.8vw, 2rem)', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['clamp(1.0625rem, 0.95rem + 0.4vw, 1.25rem)', { lineHeight: '1.7' }],
        'body-md': ['clamp(0.9375rem, 0.875rem + 0.25vw, 1.0625rem)', { lineHeight: '1.65' }],
        'body-sm': ['clamp(0.8125rem, 0.775rem + 0.15vw, 0.9375rem)', { lineHeight: '1.55' }],
        'body-xs': ['clamp(0.6875rem, 0.65rem + 0.15vw, 0.8125rem)', { lineHeight: '1.5' }],
      },
       colors: {
         // UAE Government Premium Color Palette
         'uae-blue': {
           DEFAULT: '#0b3c5d',
           light: '#1a5a7a',
           dark: '#072a3a',
         },
         'uae-gold': {
           DEFAULT: '#d4af37',
           light: '#e7cf6f',
           dark: '#c9a42f',
         },
         primary: {
           DEFAULT: '#0b3c5d',
           50: '#e6f0f5',
           100: '#cce0eb',
           200: '#99c1d7',
           300: '#66a2c3',
           400: '#3383af',
           500: '#0b3c5d',
           600: '#09364a',
           700: '#072a3a',
           800: '#051e2a',
           900: '#03121a',
         },
         // Desert Sand Palette
         sand: {
           DEFAULT: '#c9b99a',
           50: '#faf8f4',
           100: '#f5f0e8',
           200: '#ebe0d1',
           300: '#e0d0ba',
           400: '#d5c0a3',
           500: '#c9b99a',
           600: '#b5a27a',
           700: '#a08b5a',
           800: '#8b743a',
           900: '#765d1a',
         },
         // UAE Gold Accent Palette
         gold: {
           DEFAULT: '#d4af37',
           50: '#fcf9ed',
           100: '#f9f3db',
           200: '#f3e7b7',
           300: '#eddb93',
           400: '#e7cf6f',
           500: '#d4af37',
           600: '#c9a42f',
           700: '#be9927',
           800: '#b38e1f',
           900: '#a88317',
         },
         // Secondary colors
         secondary: {
           DEFAULT: '#d4af37',
           dark: '#c9a42f',
           light: '#e0c04a',
         },
        // Brand colors
        brand: {
          light: '#faf8f4',
          dark: '#0f172a',
          text: '#334155',
          muted: '#64748b',
        },
        // Glassmorphism backgrounds
        glass: {
          light: 'rgba(255, 255, 255, 0.85)',
          dark: 'rgba(15, 23, 42, 0.85)',
          sand: 'rgba(250, 248, 244, 0.9)',
        },
      },
       backgroundImage: {
         // Desert sand gradients
         'sand-gradient': 'linear-gradient(135deg, #faf8f4 0%, #f5f0e8 50%, #ebe0d1 100%)',
         'sand-gradient-radial': 'radial-gradient(ellipse at center, #f5f0e8 0%, #e0d0ba 100%)',
         // Gold accent gradients
         'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #e7cf6f 50%, #d4af37 100%)',
         'gold-gradient-shine': 'linear-gradient(90deg, #d4af37 0%, #f9f3db 50%, #d4af37 100%)',
         'gold-gradient-subtle': 'linear-gradient(180deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)',
         // Premium UAE government gradients
         'uae-hero': 'linear-gradient(135deg, #0b3c5d 0%, #09364a 50%, #072a3a 100%)',
         'uae-premium': 'linear-gradient(135deg, #faf8f4 0%, #f5f0e8 50%, #e6f0f5 100%)',
         'uae-gradient': 'linear-gradient(135deg, #0b3c5d 0%, #d4af37 100%)',
       },
      lineHeight: {
        'tight': '1.2',
        'snug': '1.35',
        'normal': '1.6',
        'relaxed': '1.75',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'normal': '0',
        'wide': '0.02em',
        'wider': '0.04em',
        'widest': '0.08em',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'snap': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
       boxShadow: {
         'soft': '0 4px 20px rgba(0, 0, 0, 0.06)',
         'soft-lg': '0 12px 40px rgba(0, 0, 0, 0.1)',
         'glow-primary': '0 4px 14px rgba(11, 60, 93, 0.25)',
         'glow-secondary': '0 4px 14px rgba(212, 175, 55, 0.25)',
         'glow-gold': '0 4px 20px rgba(212, 175, 55, 0.3)',
         'glow-uae': '0 4px 20px rgba(11, 60, 93, 0.25)',
         'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',
         'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.12)',
       },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 20px 10px rgba(212, 175, 55, 0.1)' },
        },
      },
    },
  },
  plugins: [],
}

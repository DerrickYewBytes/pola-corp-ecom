/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A3D62',
          light: '#1a5a8a',
          dark: '#052a44'
        },
        accent: {
          DEFAULT: '#FF6B35',
          light: '#ff8a5c',
          dark: '#e55a2b'
        },
        background: {
          DEFAULT: '#F5F6FA',
          light: '#ffffff'
        },
        text: {
          primary: '#2D2D2D',
          secondary: '#7B7B7B'
        },
        surface: {
          DEFAULT: '#FFFFFF'
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif']
      },
      fontSize: {
        'h1': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'h2': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '28px', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'caption': ['14px', { lineHeight: '20px', fontWeight: '400' }]
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.15)'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      }
    },
  },
  plugins: [],
} 
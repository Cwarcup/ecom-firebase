/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ccffff',
        secondary: '#7b8bd1',
        accent: '#e1ed74',
        neutral: '#1B2327',
        'base-100': '#ECE8ED',
        info: '#98BBEB',
        success: '#175E50',
        warning: '#FBB956',
        error: '#F77E6E',
      },
    },
  },
  plugins: [],
}

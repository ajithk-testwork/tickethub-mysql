/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Pitch Dark background for a premium feel
        background: '#09090B', // Zinc 950
        
        // Slightly lighter cards to stand out on the bento grid
        card: '#18181B', // Zinc 900
        
        // Vibrant Electric Cyan for buttons & highlights
        primary: '#06B6D4', // Cyan 500
        
        // Cool Blue for gradients and secondary elements
        secondary: '#3B82F6', // Blue 500
        
        // Neon Rose for "Trending" badges and attention grabbers
        accent: '#F43F5E', // Rose 500
        
        // Crisp white for main text
        textMain: '#FAFAFA', // Zinc 50
        
        // Muted gray for subtitles and descriptions
        textSecondary: '#A1A1AA', // Zinc 400
        
        // Subtle borders to separate bento items cleanly
        borderCol: '#27272A', // Zinc 800
        
        success: '#10B981', // Emerald 500
        error: '#EF4444', // Red 500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
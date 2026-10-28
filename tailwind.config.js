/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF6E9",
        ink: "#1F2A44",
        marigold: "#F5B301",
        coral: "#E8604F",
        sky: "#8FD0EA",
        leaf: "#5DAA7A",
      },
      fontFamily: {
        heading: ["Fredoka", "cursive", "sans-serif"],
        display: ["Fredoka", "sans-serif"],
        sans: ["Nunito", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      // Responsive text scaling strategy for mobile devices
      // Enforces a minimum base text size of 14px (0.875rem) on small screens
      fontSize: {
        // Core scale adjusted so mobile text never drops below 14px
        xs: ['clamp(0.875rem, 0.85rem + 0.15vw, 0.9375rem)', { lineHeight: '1.35' }],      // Min 14px on mobile
        sm: ['clamp(0.9375rem, 0.9rem + 0.2vw, 1rem)', { lineHeight: '1.4' }],             // Min 15px on mobile
        base: ['clamp(1rem, 0.95rem + 0.25vw, 1.125rem)', { lineHeight: '1.5' }],           // Min 16px on mobile
        lg: ['clamp(1.125rem, 1.05rem + 0.5vw, 1.25rem)', { lineHeight: '1.45' }],         // Min 18px on mobile
        xl: ['clamp(1.25rem, 1.15rem + 0.75vw, 1.5rem)', { lineHeight: '1.4' }],           // Min 20px on mobile
        '2xl': ['clamp(1.5rem, 1.35rem + 1vw, 1.875rem)', { lineHeight: '1.35' }],         // Min 24px on mobile
        '3xl': ['clamp(1.875rem, 1.65rem + 1.25vw, 2.25rem)', { lineHeight: '1.3' }],      // Min 30px on mobile
        '4xl': ['clamp(2.25rem, 2rem + 1.5vw, 2.75rem)', { lineHeight: '1.2' }],           // Min 36px on mobile

        // Dedicated product card & e-commerce mobile readability tokens
        'product-meta': ['clamp(0.875rem, 0.85rem + 0.15vw, 0.9375rem)', { lineHeight: '1.35', letterSpacing: '0.01em' }], // Min 14px
        'product-desc': ['clamp(0.875rem, 0.85rem + 0.2vw, 0.9375rem)', { lineHeight: '1.45' }],                          // Min 14px
        'product-title': ['clamp(1rem, 0.95rem + 0.4vw, 1.25rem)', { lineHeight: '1.3', fontWeight: '700' }],             // Min 16px, readable title
        'product-price': ['clamp(1.125rem, 1.05rem + 0.6vw, 1.45rem)', { lineHeight: '1.25', fontWeight: '700' }],        // Min 18px, bold pricing
        'product-badge': ['clamp(0.875rem, 0.85rem + 0.15vw, 0.875rem)', { lineHeight: '1.2', fontWeight: '700' }],        // Min 14px kicker
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};

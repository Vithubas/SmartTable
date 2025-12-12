/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FF6B35',      // Orange
                secondary: '#1A1A1A',    // Black
                accent: '#FFFFFF',       // White
                'orange-dark': '#E85A2A',
                'orange-light': '#FF8C61',
                'gray-dark': '#2D2D2D',
                'gray-light': '#F5F5F5'
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}

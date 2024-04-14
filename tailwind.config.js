/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                text: '#daedf6',
                background: '#040c10',
                primary: '#8fc4e3',
                secondary: '#291f7b',
                accent: '#6d37cd'
            },
            fontFamily: {
                ubuntu: ['Ubuntu', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
                inter: ['Inter', 'sans-serif']
            },
            inset: {
                middle: 'calc(50% - 1px)',
                main: 'calc(50% - 102px)'
            },
            maxHeight: {
                timeline: 'calc(100vh - 32px)'
            }
        }
    },
    plugins: []
};

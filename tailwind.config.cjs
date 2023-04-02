/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'sans-serif']
            },
            width: {
                99: 'calc(100% - 1.5rem)'
            }
        }
    },
    plugins: []
}

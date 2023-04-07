/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './features/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            keyframes: {
                typing: {
                    '0%': {
                        width: '0%',
                        visibility: 'hidden',
                    },
                    '100%': {
                        width: '100%',
                    },
                },
                blink: {
                    '50%': {
                        borderColor: 'transparent',
                    },
                    '100%': {
                        borderColor: 'white',
                    },
                },
            },
            animation: {
                typing: 'typing 2s steps(30) alternate',
                // typing:'typing 2.7s ease-out .8s infinite alternate both',
            },
        },
    },
    variants: {
        extend: {
            visibility: ['group-hover'],
        },
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    // plugins: [],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: '',
        darkTheme: 'light',
    },
};

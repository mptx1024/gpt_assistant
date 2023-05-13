const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './features/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            translate: ['dark'],
            colors: {
                'light-text': colors.gray[700],
                'dark-text': colors.gray[200],

                'light-bg': colors.gray[100],
                'dark-bg': colors.gray[900],

                'light-bg-card': colors.gray[300],
                'light-bg-card-hover': colors.gray[400],

                'dark-bg-card': colors.gray[700],
                'dark-bg-card-hover': colors.gray[600],
            },

            keyframes: {
                typing: {
                    '0%': {
                        width: '0%',
                        visibility: 'hidden',
                    },
                    '100%': {
                        width: '90%',
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
                slideIn: {
                    '0%': {
                        opacity: '0%',
                        transform: 'translateY(20px)',
                    },
                    '100%': {
                        opacity: '100%',
                        transform: 'translateY(0px)',
                    },
                },
            },
            animation: {
                typing: 'typing 0.9s alternate',
                slideIn: 'slideIn 0.4s ease',
                // typing:'typing 2.7s ease-out .8s infinite alternate both',
            },
        },
    },

    variants: {
        extend: {
            visibility: ['group-hover'],
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
        require('@headlessui/tailwindcss'),
    ],
};

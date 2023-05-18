const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './features/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontSize: {
            sm: '0.8rem',
            base: '0.9rem',
        },
        extend: {
            translate: ['dark'],
            textColor: {
                primary: {
                    base: colors.gray[700],
                    dark: colors.gray[200],
                },
                secondary: {
                    base: colors.gray[500],
                    dark: colors.gray[400],
                },
            },
            backgroundColor: {
                primary: {},
                secondary: {
                    base: colors.gray[200],
                    dark: colors.zinc[900],
                },
            },
            colors: {
                primary: colors.cyan[700],
                card: {
                    light: colors.neutral[50],
                    dark: '#1E1E1E',
                },
                'light-text': colors.gray[700],
                'dark-text': colors.gray[200],

                'light-bg': colors.gray[100],
                'dark-bg': '#18181B',
            },

            keyframes: {
                typing: {
                    '0%': {
                        width: '0%',
                        visibility: 'hidden',
                    },
                    '100%': {
                        width: '80%',
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
                        transform: 'translateY(-50%)',
                    },
                    '100%': {
                        opacity: '100%',
                        transform: 'translateY(0)',
                    },
                },
                slideInFromTop: {
                    '0%': {
                        opacity: '0%',
                        transform: 'translateY(-20px)',
                    },
                    '100%': {
                        opacity: '100%',
                        // transform: 'translateY(0px)',
                    },
                },

                // alertOut: {
                //     '0%': {
                //         opacity: '100%',
                //         // transform: 'translateY(-20px)',
                //     },
                //     '100%': {
                //         opacity: '0%',
                //         transform: 'translateY(-20px)',
                //     },
                // },
            },
            animation: {
                typing: 'typing 0.9s alternate',
                slideIn: 'slideIn 0.4s ease',
                slideInFromTop: 'slideInFromTop 0.3s ease',
                // alertOut: 'alertOut 0.6s ease',
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
        require('autoprefixer'),
    ],
};

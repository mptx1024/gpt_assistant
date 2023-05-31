const colors = require('tailwindcss/colors');
module.exports = {
    darkMode: ['class'],
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
                // colorPrimary: colors.cyan[700],
                colorPrimary: colors.teal[600],
                colorSecondary: colors.amber[300],
                black: {
                    base: '#333333',
                    DEFAULT: colors.black,
                    inverted: colors.neutral[300],
                },
                white: {
                    DEFAULT: colors.white,
                    inverted: colors.neutral[900],
                },
                gray: {
                    base: colors.neutral[50],
                    inverted: colors.neutral[800],
                },
            },

            fontSize: {
                sm: '0.8rem',
                base: '0.9rem',
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
                    },
                },
                slideInFromBottom: {
                    '0%': {
                        opacity: '0%',
                        transform: 'translateY(20px)',
                    },
                    '100%': {
                        opacity: '100%',
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
                slideInFromBottom: 'slideInFromBottom 0.3s ease',
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

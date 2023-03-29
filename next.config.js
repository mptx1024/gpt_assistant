/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/chat',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;

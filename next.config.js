const nextConfig = {
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/role',
                permanent: true,
            },
        ];
    },
    webpack(config, { isServer, dev }) {
        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
        };

        return config;
    },
};

module.exports = nextConfig;

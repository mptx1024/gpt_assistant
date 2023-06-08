const nextConfig = {
    experimental: {
        appDir: true,
    },
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
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

module.exports = nextConfig;

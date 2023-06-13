const nextConfig = {
    experimental: {
        appDir: false,
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
    webpack(config) {
        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
        };
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: /url/ }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            }
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
};

module.exports = nextConfig;
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// });
// module.exports = withBundleAnalyzer({
//     // your Next.js configuration
// });
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer({
//     env: {
//         NEXT_PUBLIC_ENV: 'PRODUCTION', //your next configs goes here
//     },
// });

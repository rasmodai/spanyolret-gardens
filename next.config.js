/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    // Noindex by default. See lib/indexing.ts. The brochure PDF carries option
    // prices: it is never indexed, whatever ALLOW_INDEXING says.
    async headers() {
        const pdf = {
            source: '/Spanyolret-gardens.pdf',
            headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
        };
        if (process.env.ALLOW_INDEXING === 'true') return [pdf];
        return [
            {
                source: '/:path*',
                headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
            },
        ];
    },
};

module.exports = nextConfig;

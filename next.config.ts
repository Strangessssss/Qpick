/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5200',
                pathname: '/images/products/**', // ✅ corrected path
            },
        ],
    },
};

module.exports = nextConfig;
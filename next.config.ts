import createNextIntlPlugin from "next-intl/plugin";
import {NextConfig} from 'next';


const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5200',
                pathname: '/images/products/**',
            },
        ],
    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
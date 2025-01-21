import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "internship-assignment-backend-server.onrender.com",
                pathname: "/uploads/**",
            },
        ],
        domains: [
            "localhost",
            "internship-assignment-backend-server.onrender.com",
        ],
    },
};

export default nextConfig;

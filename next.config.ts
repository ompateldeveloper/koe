import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        // Enable Server Actions (if not already enabled)
        serverActions: {
            bodySizeLimit: "200mb",
            allowedOrigins: ["*"],
        },
    },
};

export default nextConfig;

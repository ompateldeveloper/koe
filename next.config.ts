import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        // Enable Server Actions (if not already enabled)
        serverActions: {
            bodySizeLimit: "25mb",
            allowedOrigins: ["*"],
        },
    },
};

export default nextConfig;

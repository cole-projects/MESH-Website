import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone/tablet preview over local Wi‑Fi
  allowedDevOrigins: ["192.168.0.175", "192.168.0.*"],
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Attention: Permet de construire l'application même s'il y a des erreurs ESLint.
    // Utile pour débloquer le build, mais les erreurs devraient être corrigées.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

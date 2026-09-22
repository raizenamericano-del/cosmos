/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' }
    ]
  },
  experimental: {
    // react-three-fiber / drei mengirim ESM ke bundle server-side komponen 3D
    optimizePackageImports: ['lucide-react', 'framer-motion']
  }
};

export default nextConfig;

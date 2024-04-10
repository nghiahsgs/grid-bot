/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/order',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

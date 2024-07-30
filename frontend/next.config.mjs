/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dydapdphs/**",
      },
      {
        protocol: "https",
        hostname: "ps.w.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.tnmt.edu.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

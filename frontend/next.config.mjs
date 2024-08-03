/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    ],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "res.cloudinary.com",
    //     port: "",
    //     pathname: "/dydapdphs/iamges/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "ps.w.org",
    //     port: "",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "www.tnmt.edu.vn",
    //     port: "",
    //     pathname: "/**",
    //   },
    // ],
  },
};

export default nextConfig;

import nextBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/dashboard/participants",
        permanent: true,
      },
      {
        source: "/admin/dashboard",
        destination: "/admin/dashboard/participants",
        permanent: true,
      },

      {
        source: "/user",
        destination: "/user/dashboard",
        permanent: true,
      },
      {
        source: "/apply",
        destination: "/apply/participant",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);

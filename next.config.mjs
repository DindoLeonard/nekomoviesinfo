/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.flixhq.to",
        // port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.movieshd.watch",
        // port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.goku.sx",
        // port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        // port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "asianimg.pro",
        // port: "",
        pathname: "**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;

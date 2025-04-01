import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['d20aeo683mqd6t.cloudfront.net', 'encrypted-tbn0.gstatic.com', 'assets.goal.com', "cf.bstatic.com", "pagedone.io", "flowbite.s3.amazonaws.com"], // Tambahkan domain yang diizinkan di sini
  },
  /* config options here */
};

export default nextConfig;

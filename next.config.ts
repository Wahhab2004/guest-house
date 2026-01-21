import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "d20aeo683mqd6t.cloudfront.net",
			},
			{
				protocol: "https",
				hostname: "encrypted-tbn0.gstatic.com",
			},
			{
				protocol: "https",
				hostname: "assets.goal.com",
			},
			{
				protocol: "https",
				hostname: "cf.bstatic.com",
			},
			{
				protocol: "https",
				hostname: "pagedone.io",
			},
			{
				protocol: "https",
				hostname: "flowbite.s3.amazonaws.com",
			},
			{
				protocol: "https",
				hostname: "pict.sindonews.net",
			},
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "be-guesthouse.vercel.app",
			},
			{
				protocol: "https",
				hostname: "content.fun-japan.jp",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "5000",
				pathname: "/uploads/**",
			},
			{
				protocol: "https",
				hostname: "be-guesthouse.vercel.app",
				pathname: "/uploads/**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com"
			},
		],
	},
};

export default nextConfig;

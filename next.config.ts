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
		],
	},
};

export default nextConfig;

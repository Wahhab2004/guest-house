import Image from "next/image";

export default function PesanOwner() {
	return (
		<div className="mt-20 sm:bg-white sm:mt-[]">
			<figure className="max-w-screen-md mx-auto text-center">
				<svg
					className="w-10 h-10 mx-auto mb-3 text-gray-400"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 18 14"
				>
					<path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
				</svg>
				<blockquote>
					<p className="text-2xl italic font-medium text-gray-900">
						&quot;Flowbite is just awesome. It contains tons of predesigned
						components and pages starting from login screen to complex
						dashboard. Perfect choice for your next SaaS application.&quot;
					</p>
				</blockquote>
				<figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
					<Image
						className="w-6 h-6 rounded-full"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
						alt="profile picture"
						width={24}
						height={24}
					/>
					<div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
						<cite className="pe-3 font-medium text-gray-900">
							Ummu Ryosuke Watanabe
						</cite>
						<cite className="ps-3 text-sm text-gray-500">CEO at Google</cite>
					</div>
				</figcaption>
			</figure>
		</div>
	);
}

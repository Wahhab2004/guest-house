"use client";

import Image from "next/image";

const BRAND_GRADIENT = "bg-gradient-to-r from-amber-500 to-amber-600";

export default function PesanOwner() {
	return (
		<section className="w-11/12 xl:w-full max-w-7xl mx-auto mt-32 px-4">
			<div
				className="relative rounded-[32px]
				bg-gradient-to-br from-amber-50 via-white to-white
				border border-amber-100 shadow-2xl p-10 md:p-16"
			>
				{/* Quote Icon */}
				<div
					className="absolute -top-6 left-1/2 -translate-x-1/2
					w-14 h-14 rounded-2xl
					bg-amber-100 text-amber-700
					flex items-center justify-center shadow-lg"
				>
					<svg
						className="w-6 h-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 18 14"
					>
						<path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
					</svg>
				</div>

				{/* Content */}
				<div className="text-center max-w-3xl mx-auto">
					<p className="text-2xl md:text-3xl italic font-medium text-slate-800 leading-relaxed">
						“Welcome to Ummu Ryosuke Guest House. A quiet, comfortable, and warm place
						to stay — just like home.”
					</p>

					{/* Owner */}
					<div className="flex flex-col items-center mt-10">
						{/* Avatar (optional, replace src if you have owner photo) */}
						<div className="w-20 h-20 rounded-full overflow-hidden border-4 border-amber-200 shadow-md mb-4">
							<Image
								src="/images/owner.jpg"
								alt="Owner"
								width={80}
								height={80}
								className="object-cover"
							/>
						</div>

						<div className="text-center">
							<p className="font-bold text-slate-800">Ummu Ryosuke Watanabe</p>
							<p className="text-sm text-slate-500">Owner, Ummu Guest House</p>
						</div>
					</div>

					{/* CTA */}
					<div className="mt-10">
						<a
							href="#rooms"
							className={`inline-flex items-center justify-center
							px-8 py-3 rounded-2xl
							${BRAND_GRADIENT}
							text-white font-bold
							hover:shadow-xl transition`}
						>
							Book Your Stay
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

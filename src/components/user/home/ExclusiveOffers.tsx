import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Baby, Heart, Tag, Wallet } from "lucide-react";

const BRAND_GRADIENT = "bg-gradient-to-r from-amber-500 to-amber-600";

const ExclusiveOffers = () => {
	return (
		<section
			className="w-11/12 xl:w-full mx-auto px-4 py-16 max-w-7xl"
			id="exclusive-offers"
		>
			{/* Section Header */}
			<div className="text-center mb-14">
				<h1 className="text-[2.5rem] font-bold text-slate-800">
					Exclusive Offers
				</h1>
				<p className="text-slate-500 mt-2 max-w-2xl mx-auto">
					Special family-friendly deals designed to make your stay more
					affordable and unforgettable.
				</p>
			</div>

			{/* ===== Offer 1 ===== */}
			<div
				className="mx-auto grid max-w-screen-xl rounded-[32px]
        bg-gradient-to-br from-amber-50 to-white
        border border-amber-100 shadow-xl
        p-6 md:p-10 lg:grid-cols-12 lg:gap-10 lg:p-16 xl:gap-16 mb-16"
			>
				<div className="lg:col-span-5">
					<IconVisual
						icon={Heart}
						title="Kids Stay Free"
						subtitle="Under 5 years old stay for free with family-friendly comfort"
					/>
				</div>

				<div className="mx-auto place-self-center lg:col-span-7 mt-6 lg:mt-0">
					<span
						className="inline-block mb-3 px-4 py-1 rounded-full
            bg-amber-100 text-amber-700 text-sm font-semibold"
					>
						Family Special
					</span>

					<h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-800 md:text-4xl">
						Kids Stay Free – Under 5 Years Old!
					</h2>

					<p className="mb-8 text-slate-600 leading-relaxed">
						Traveling with little ones? We’ve got you covered! Children under{" "}
						<span className="font-semibold text-slate-800">
							5 years old stay absolutely free
						</span>
						. Enjoy your family vacation without extra costs for your youngest
						guests.
					</p>

					<Link
						href="#rooms"
						className={`inline-flex items-center justify-center
            rounded-2xl ${BRAND_GRADIENT}
            px-6 py-3 text-base font-bold text-white
            hover:shadow-xl transition`}
					>
						Book Now
					</Link>
				</div>
			</div>

			{/* ===== Offer 2 ===== */}
			<div
				className="mx-auto grid max-w-screen-xl rounded-[32px]
        bg-gradient-to-br from-white to-amber-50
        border border-amber-100 shadow-xl
        p-6 md:p-10 lg:grid-cols-12 lg:gap-10 lg:p-16 xl:gap-16"
			>
				{/* Mobile Image */}
				<div className="lg:hidden lg:col-span-5">
					<IconVisual
						icon={Tag}
						title="Half Price Deal"
						subtitle="Special discount for kids aged 5 to 10"
					/>
				</div>

				<div className="mx-auto place-self-center lg:col-span-7 mt-6 lg:mt-0 lg:text-right">
					<span
						className="inline-block mb-3 px-4 py-1 rounded-full
            bg-amber-100 text-amber-700 text-sm font-semibold"
					>
						Special Discount
					</span>

					<h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-800 md:text-4xl">
						Half Price Stay – For Kids Aged 5 to 10
					</h2>

					<p className="mb-8 text-slate-600 leading-relaxed">
						Make your family getaway more affordable! Children aged{" "}
						<span className="font-semibold text-slate-800">5 to 10 years</span>{" "}
						enjoy their stay at{" "}
						<span className="font-semibold text-slate-800">
							half the regular price
						</span>
						. More savings means more fun for everyone.
					</p>

					<div className="flex lg:justify-end">
						<Link
							href="#rooms"
							className={`inline-flex items-center justify-center
              rounded-2xl ${BRAND_GRADIENT}
              px-6 py-3 text-base font-bold text-white
              hover:shadow-xl transition`}
						>
							Book Now
						</Link>
					</div>
				</div>

				{/* Desktop Image */}
				<div className="hidden lg:block lg:col-span-5">
					<IconVisual
						icon={Tag}
						title="Half Price Deal"
						subtitle="Special discount for kids aged 5 to 10"
					/>
				</div>
			</div>
		</section>
	);
};

export default ExclusiveOffers;

function IconVisual({
	icon: Icon,
	title,
	subtitle,
}: {
	icon: any;
	title: string;
	subtitle: string;
}) {
	return (
		<div
			className="w-full h-[260px] md:h-[320px] lg:h-full
			rounded-3xl flex flex-col items-center justify-center text-center
			bg-gradient-to-br from-amber-100 to-amber-50
			border border-amber-200 shadow-md"
		>
			<Icon size={64} className="text-amber-600 mb-4" />
			<h3 className="text-lg font-bold text-amber-700">{title}</h3>
			<p className="text-sm text-amber-600 mt-1 max-w-[220px]">{subtitle}</p>
		</div>
	);
}

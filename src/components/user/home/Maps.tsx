"use client";

import { MapPin, Clock, Mail, Phone } from "lucide-react";

const BRAND_GRADIENT = "bg-gradient-to-r from-amber-500 to-amber-600";

export default function Maps() {
	return (
		<section
			className="w-11/12 xl:w-full max-w-7xl mx-auto mt-32 px-4 mb-20"
			id="location"
		>
			{/* Header */}
			<div className="text-center mb-14">
				<h2 className="text-[2.5rem] font-bold text-slate-800">
					Find Us Easily
				</h2>
				<p className="text-slate-500 mt-2 max-w-2xl mx-auto">
					Located in a strategic area of Tokyo, Ummu Guest House is surrounded
					by public transport, attractions, and daily conveniences.
				</p>
			</div>

			{/* Card */}
			<div
				className="grid grid-cols-1 lg:grid-cols-2 gap-8
				rounded-[32px] bg-white
				border border-amber-100 shadow-2xl p-6 md:p-10"
			>
				{/* Map */}
				<div className="rounded-3xl overflow-hidden border border-amber-100 shadow-md">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3239.9069652362773!2d139.85969927578873!3d35.70390697257987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDQyJzE0LjEiTiAxMznCsDUxJzQ0LjIiRQ!5e0!3m2!1sid!2sid!4v1754885927446!5m2!1sid!2sid"
						className="w-full h-[320px] md:h-[420px]"
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>
				</div>

				{/* Info Panel */}
				<div
					className="rounded-3xl bg-gradient-to-br from-amber-50 to-white
					border border-amber-100 shadow-md p-8 flex flex-col justify-between"
				>
					<div className="space-y-8">
						{/* Address */}
						<div className="flex gap-4">
							<div
								className="w-12 h-12 rounded-2xl bg-amber-100
								text-amber-700 flex items-center justify-center"
							>
								<MapPin size={22} />
							</div>
							<div>
								<h3 className="text-lg font-bold text-slate-800">
									Our Address
								</h3>
								<p className="text-slate-600 mt-1 leading-relaxed">
									WATANABE HOUSE <br />
									1-8-14 Matsushima, Edogawa-ku <br />
									Tokyo 132-0031, Japan
								</p>
							</div>
						</div>

						{/* Hours */}
						<div className="flex gap-4">
							<div
								className="w-12 h-12 rounded-2xl bg-amber-100
								text-amber-700 flex items-center justify-center"
							>
								<Clock size={22} />
							</div>
							<div>
								<h3 className="text-lg font-bold text-slate-800">
									Opening Hours
								</h3>
								<p className="text-slate-600 mt-1">
									Monday – Sunday <br />
									24 Hours Service
								</p>
							</div>
						</div>

						{/* Contact */}
						<div className="flex gap-4">
							<div
								className="w-12 h-12 rounded-2xl bg-amber-100
								text-amber-700 flex items-center justify-center"
							>
								<Mail size={22} />
							</div>
							<div>
								<h3 className="text-lg font-bold text-slate-800">Contact</h3>
								<p className="text-slate-600 mt-1">
									Email: imaswatanabe@me.com <br />
									Phone: +81 80-3242-3077
								</p>
							</div>
						</div>
					</div>

					{/* CTA */}
					<div className="mt-10">
						<a
							href="https://www.google.com/maps"
							target="_blank"
							rel="noopener noreferrer"
							className={`inline-flex items-center justify-center
							w-full rounded-2xl ${BRAND_GRADIENT}
							px-6 py-3 text-base font-bold text-white
							hover:shadow-xl transition`}
						>
							Get Directions
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export default function HeroSection() {
	return (
		<section className="relative w-full h-screen">
			{/* Background */}
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{
					backgroundImage: "url(/images/house.jpg)",
				}}
			/>

			{/* Overlay Gradient */}
			<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

			{/* Content */}
			<div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6 md:px-10 ">
				<div className="max-w-2xl space-y-6 mt-14">
					<p className="tracking-widest text-sm text-amber-400 font-semibold uppercase">
						Guesthouse Ummu
					</p>

					<h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
						Stay in Comfort, <br />
						<span className="text-amber-400">
							Experience Unforgettable Moments
						</span>
					</h1>

					<p className="text-white/80 text-lg leading-relaxed">
						Discover a peaceful retreat designed for relaxation, warmth, and
						memorable stays — where every night feels like home and every
						morning begins with comfort.
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-wrap gap-4 pt-4">
						<a
							href="#rooms"
							className="px-8 py-3 rounded-xl
							bg-gradient-to-r from-amber-500 to-amber-600
							text-white font-bold shadow-lg
							hover:shadow-xl hover:scale-[1.02]
							transition-all"
						>
							Book Your Stay
						</a>

						<a
							href="#rooms"
							className="px-8 py-3 rounded-xl
							border-2 border-white/80
							text-white font-bold
							hover:bg-white hover:text-black
							transition-all"
						>
							Explore Rooms
						</a>
					</div>

					{/* Certification Badge */}
					<div className="flex items-center gap-3">
						<div
							className="group relative inline-flex items-center gap-2
							bg-white/90 backdrop-blur-md
							text-slate-800
							px-4 py-2 rounded-xl shadow-lg
							border border-amber-200
							cursor-default"
						>
							{/* Icon */}
							<span className="text-amber-600 text-lg">🏛</span>

							{/* Text */}
							<div className="text-sm leading-tight">
								<p className="font-bold">Government Certified Stay</p>
								<p className="text-xs text-slate-600">
									License No: <span className="font-semibold">M1300059386</span>
								</p>
							</div>

							{/* Tooltip */}
							<div
								className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
								hidden group-hover:block
								bg-black text-white text-xs
								px-3 py-2 rounded-lg shadow-xl whitespace-nowrap"
							>
								Certified by Edogawa City Government, Japan
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

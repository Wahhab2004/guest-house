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
			<div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6 md:px-10">
				<div className="max-w-2xl space-y-6">
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
				</div>
			</div>
		</section>
	);
}

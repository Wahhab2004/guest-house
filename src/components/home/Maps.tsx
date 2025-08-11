export default function Maps() {
	return (
		<div className="max-w-7xl mx-auto px-4 w-11/12 xl:w-full mt-20">
			<section className="">
				<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
					<div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
						<h2 className="text-3xl font-extrabold text-gray-900">
							Visit Our Location
						</h2>
						<p className="mt-4 text-lg text-gray-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
						</p>
					</div>
					<div className="mt-16 lg:mt-20">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="rounded-lg overflow-hidden">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3239.9069652362773!2d139.85969927578873!3d35.70390697257987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDQyJzE0LjEiTiAxMznCsDUxJzQ0LjIiRQ!5e0!3m2!1sid!2sid!4v1754885927446!5m2!1sid!2sid"
									className="w-full h-96"
									allowFullScreen= {true}
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								></iframe>
							</div>
							<div>
								<div className="max-w-full mx-auto rounded-lg overflow-hidden">
									<div className="px-6 py-4">
										<h3 className="text-lg font-medium text-gray-900">
											Our Address
										</h3>
										<p className="mt-1 text-gray-600">
											WATANABE HOUSE 1-8-14 MATSUSHIMA EDOGAWA KU TOKYO 132-0031
										</p>
									</div>
									<div className="border-t border-gray-200 px-6 py-4">
										<h3 className="text-lg font-medium text-gray-900">Hours</h3>
										<p className="mt-1 text-gray-600">
											Monday - Sunday: 24 hours
										</p>
									</div>
									<div className="border-t border-gray-200 px-6 py-4">
										<h3 className="text-lg font-medium text-gray-900">
											Contact
										</h3>
										<p className="mt-1 text-gray-600">
											Email: imaswatanabe@me.com
										</p>
										<p className="mt-1 text-gray-600">
											Phone: +81 80-3242-3077
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

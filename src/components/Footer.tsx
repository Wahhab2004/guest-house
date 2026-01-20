"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, Instagram, Facebook, Globe } from "lucide-react";

const BRAND_GRADIENT = "bg-gradient-to-r from-amber-500 to-amber-600";

export default function Footer() {
	return (
		<footer className="mt-32 bg-gradient-to-b from-amber-50 to-white border-t border-amber-100">
			<div className="max-w-7xl mx-auto px-6 py-16 w-11/12 xl:w-full">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
					{/* Brand */}
					<div>
						<Image
							src="/images/ummu_logo_1.png"
							alt="Ummu Guest House"
							width={140}
							height={60}
							className="object-contain mb-4"
						/>
						<p className="text-slate-600 leading-relaxed">
							A warm, peaceful, and family-friendly guest house in the heart of
							Tokyo. Your home away from home.
						</p>

						<div className="flex gap-4 mt-6">
							<a
								href="#"
								className="w-10 h-10 flex items-center justify-center
								rounded-xl bg-amber-100 text-amber-700
								hover:bg-amber-200 transition"
							>
								<Instagram size={18} />
							</a>
							<a
								href="#"
								className="w-10 h-10 flex items-center justify-center
								rounded-xl bg-amber-100 text-amber-700
								hover:bg-amber-200 transition"
							>
								<Facebook size={18} />
							</a>
							<a
								href="#"
								className="w-10 h-10 flex items-center justify-center
								rounded-xl bg-amber-100 text-amber-700
								hover:bg-amber-200 transition"
							>
								<Globe size={18} />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-bold text-slate-800 mb-4">
							Quick Links
						</h3>
						<ul className="space-y-3 text-slate-600">
							<li>
								<Link href="/" className="hover:text-amber-600 transition">
									Home
								</Link>
							</li>
							<li>
								<Link href="#rooms" className="hover:text-amber-600 transition">
									Rooms
								</Link>
							</li>
							<li>
								<Link
									href="#exclusive-offers"
									className="hover:text-amber-600 transition"
								>
									Exclusive Offers
								</Link>
							</li>
							<li>
								<Link
									href="#location"
									className="hover:text-amber-600 transition"
								>
									Location
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h3 className="text-lg font-bold text-slate-800 mb-4">
							Contact Us
						</h3>
						<ul className="space-y-4 text-slate-600">
							<li className="flex gap-3">
								<MapPin size={18} className="text-amber-600 mt-1" />
								<span>
									WATANABE HOUSE <br />
									1-8-14 Matsushima, Edogawa-ku <br />
									Tokyo 132-0031, Japan
								</span>
							</li>
							<li className="flex gap-3">
								<Mail size={18} className="text-amber-600 mt-1" />
								<span>imaswatanabe@me.com</span>
							</li>
							<li className="flex gap-3">
								<Phone size={18} className="text-amber-600 mt-1" />
								<span>+81 80-3242-3077</span>
							</li>
						</ul>
					</div>

					{/* Certified / Trust Section */}
					<div>
						<h3 className="text-lg font-bold text-slate-800 mb-4">
							Government Certified
						</h3>

						<div
							className="bg-white border border-amber-200
							rounded-2xl p-4 shadow-md"
						>
							<div className="flex items-center gap-3 mb-3">
								<span className="text-2xl text-amber-600">🏛</span>
								<div>
									<p className="font-bold text-slate-800">
										Private Lodging Business
									</p>
									<p className="text-xs text-slate-500">
										Officially Registered in Japan
									</p>
								</div>
							</div>

							<div className="text-sm text-slate-600 space-y-1">
								<p>
									<span className="font-semibold">License No:</span>{" "}
									M1300059386
								</p>
								<p>
									<span className="font-semibold">Authority:</span>{" "}
									Edogawa City Government
								</p>
								<p>
									<span className="font-semibold">Country:</span> Japan
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-amber-100 bg-white">
				<div
					className="max-w-7xl mx-auto px-6 py-6
					flex flex-col md:flex-row items-center justify-between
					text-slate-500 text-sm w-11/12 xl:w-full"
				>
					<span>
						© {new Date().getFullYear()} Ummu Ryosuke Guest House. All rights reserved.
					</span>
					<div className="flex gap-4 mt-3 md:mt-0">
						<Link href="#" className="hover:text-amber-600 transition">
							Privacy Policy
						</Link>
						<Link href="#" className="hover:text-amber-600 transition">
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

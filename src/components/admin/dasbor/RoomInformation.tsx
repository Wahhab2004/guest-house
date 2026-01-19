"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarCheck, Clock, CreditCard, CheckCircle } from "lucide-react";
import {
	fetchReservationSummaryThisMonth,
	ReservationSummary,
} from "@/fetching";

export default function ReservationInsights() {
	const [summary, setSummary] = useState<ReservationSummary | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const load = async () => {
			try {
				setLoading(true);
				const data = await fetchReservationSummaryThisMonth();
				setSummary(data);
			} catch (e) {
				console.error("Gagal mengambil summary reservasi", e);
			} finally {
				setLoading(false);
			}
		};

		load();
	}, []);

	const pending = summary?.byStatus?.PENDING || 0;
	const confirmed = summary?.byStatus?.CONFIRMED || 0;
	const unpaid = summary?.byPayment?.UNPAID || 0;
	const totalMonth = summary?.totalFiltered || 0;
	const paidButNotActive = summary?.paidButNotActive || 0;

	return (
		<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<InsightCard
				title="Reservasi Bulan Ini"
				value={loading ? "..." : totalMonth}
				icon={<CalendarCheck className="text-blue-500" size={28} />}
				href="/guest-reservation"
				gradient="from-blue-50 to-blue-100"
			/>

			<InsightCard
				title="Belum Dikonfirmasi"
				value={loading ? "..." : pending}
				icon={<Clock className="text-amber-500" size={28} />}
				href="/guest-reservation?status=PENDING"
				gradient="from-amber-50 to-amber-100"
			/>

			<InsightCard
				title="Belum Bayar"
				value={loading ? "..." : unpaid}
				icon={<CreditCard className="text-red-500" size={28} />}
				href="/guest-reservation?paymentStatus=UNPAID"
				gradient="from-red-50 to-red-100"
			/>

			<InsightCard
				title="Sudah Dikonfirmasi"
				value={loading ? "..." : confirmed}
				icon={<CheckCircle className="text-green-500" size={28} />}
				href="/guest-reservation?status=CONFIRMED"
				gradient="from-green-50 to-green-100"
			/>

			<InsightCard
				title="Sudah Bayar, Belum Aktif"
				value={loading ? "..." : paidButNotActive}
				icon={<CheckCircle className="text-purple-500" size={28} />}
				href="/guest-reservation?status=CONFIRMED&paymentStatus=PAID"
				gradient="from-purple-50 to-purple-100"
			/>
		</div>
	);
}

function InsightCard({
	title,
	value,
	icon,
	href,
	gradient,
}: {
	title: string;
	value: string | number;
	icon: React.ReactNode;
	href: string;
	gradient: string;
}) {
	return (
		<div
			className={`bg-gradient-to-br ${gradient} border border-slate-200 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-all group`}
		>
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-semibold text-slate-600">{title}</p>
					<p className="text-4xl font-bold text-slate-900 mt-2">{value}</p>

					<Link
						href={href}
						className="inline-block mt-4 text-sm font-bold text-[#FFB22C] hover:underline"
					>
						Lihat detail →
					</Link>
				</div>

				<div className="p-4 bg-white/70 backdrop-blur rounded-2xl border border-white/60 group-hover:scale-110 transition-transform duration-300">
					{icon}
				</div>
			</div>
		</div>
	);
}

// Badge.tsx
export default function Badge({ children, type }: { children: React.ReactNode; type?: string }) {
	const colorMap: Record<string, string> = {
		PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
		CONFIRMED: "bg-green-100 text-green-800 border-green-300",
		CANCELLED: "bg-red-100 text-red-800 border-red-300",
		PAID: "bg-green-100 text-green-800 border-green-300",
		HALF_PAID: "bg-orange-100 text-orange-800 border-orange-300",
		UNPAID: "bg-red-100 text-red-800 border-red-300",
		CASH: "bg-green-100 text-green-800 border-green-300",
		TRANSFER: "bg-yellow-100 text-yellow-800 border-yellow-300",
		CHECKED_OUT: "bg-blue-100 text-blue-800 border-blue-300",
	};

	const style = colorMap[type || ""] || "bg-gray-100 text-gray-700 border-gray-300";

	return (
		<span className={`text-xs px-2 py-1 rounded-full border ${style}`}>
			{children}
		</span>
	);
}

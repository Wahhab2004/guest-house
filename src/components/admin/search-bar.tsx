import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react"; // pastikan lucide-react sudah diinstall

interface SearchBarProps<T> {
	data: T[];
	searchField: string;
	onSearchResult: (results: T[]) => void;
	placeholder?: string;
	loading?: boolean; // tambahan props untuk loading
}

export default function SearchBar<T>({
	data,
	searchField,
	onSearchResult,
	placeholder = "Search...",
	loading = false,
}: SearchBarProps<T>) {
	const [searchQuery, setSearchQuery] = useState("");

	// Utility untuk akses nested key, misal 'guest.name'


	useEffect(() => {
		if (!searchQuery) {
			onSearchResult(data);
			return;
		}

		const getValueByPath = (obj: T, path: string): unknown => {
			return path.split(".").reduce<unknown>((acc, key) => {
				if (typeof acc === "object" && acc !== null && key in acc) {
					return (acc as Record<string, unknown>)[key];
				}
				return undefined;
			}, obj);
		};
		

		const result = data.filter((item) => {
			const value = getValueByPath(item, searchField);
			if (typeof value === "string") {
				return value.toLowerCase().includes(searchQuery.toLowerCase());
			}
			return false;
		});

		onSearchResult(result);
	}, [searchQuery, data, searchField, onSearchResult]);

	const handleClear = () => setSearchQuery("");

	return (
		<div className="mb-4 flex justify-end mr-20">
			<div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 shadow-sm bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200 w-full max-w-md">
				{/* Icon Search */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-5 h-5 text-gray-500 mr-2"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 105.4 5.4a7.5 7.5 0 0011.25 11.25z"
					/>
				</svg>

				{/* Input */}
				<input
					type="text"
					placeholder={placeholder}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
				/>

				{/* Loading or Clear Icon */}
				{loading ? (
					<Loader2 className="w-4 h-4 text-blue-500 animate-spin ml-2" />
				) : (
					searchQuery && (
						<button onClick={handleClear}>
							<X className="w-4 h-4 text-gray-400 hover:text-red-500 ml-2" />
						</button>
					)
				)}
			</div>
		</div>
	);
}

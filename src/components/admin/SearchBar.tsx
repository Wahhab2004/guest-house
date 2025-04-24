import { useEffect, useState } from "react";

interface SearchBarProps<T> {
	data: T[];
	searchField: string;
	onSearchResult: (results: T[]) => void;
	placeholder?: string;
}

export default function SearchBar<T>({
	data,
	searchField,
	onSearchResult,
	placeholder = "Search...",
}: SearchBarProps<T>) {
	const [searchQuery, setSearchQuery] = useState("");

	// Utility untuk akses nested key, misal 'guest.name'
	const getValueByPath = (obj: any, path: string): any => {
		return path.split(".").reduce((acc, key) => acc?.[key], obj);
	};

	useEffect(() => {
		if (!searchQuery) {
			onSearchResult(data);
			return;
		}

		const result = data.filter((item) => {
			const value = getValueByPath(item, searchField);
			if (typeof value === "string") {
				return value.toLowerCase().includes(searchQuery.toLowerCase());
			}
			return false;
		});

		onSearchResult(result);
	}, [searchQuery, data]);

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
			</div>
		</div>
	);
}

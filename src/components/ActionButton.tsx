// ActionButton.tsx
function ActionButton({
	onClick,
	label,
	color,
	icon,
}: {
	onClick: () => void;
	label: string;
	color: "blue" | "amber" | "red";
	icon: string;
}) {
	const colorMap = {
		blue: "bg-blue-500 hover:bg-blue-600 text-white",
		amber: "bg-amber-500 hover:bg-amber-600 text-white",
		red: "bg-red-500 hover:bg-red-600 text-white",
	};

	return (
		<button
			onClick={onClick}
			className={`text-xs px-3 py-1 rounded-md flex items-center gap-1 ${colorMap[color]}`}
		>
			<span>{icon}</span>
			{label}
		</button>
	);
}

export default ActionButton;
import { ReactNode } from "react";

type ActionButtonProps = {
	onClick: () => void;
	label: string;
	icon?: ReactNode;
	tooltip?: ReactNode;
	variant?: "primary" | "danger" | "warning" | "ghost" | "detail";
};

function ActionButton({
	onClick,
	label,
	icon,
	tooltip,
	variant = "ghost",
}: ActionButtonProps) {
	const variantStyle = {
		primary: "bg-amber-600 text-white hover:bg-amber-700",
		danger: "text-red-600 hover:bg-red-200",
		detail: "text-blue-600 hover:bg-blue-200",
		warning: "text-amber-700 hover:bg-amber-200",
		ghost: "text-stone-700 hover:bg-stone-200",
	};

	return (
		<div className="relative group inline-block">
			<button
				onClick={onClick}
				className={`p-1.5 rounded-lg flex items-center text-xs font-medium
        transition-transform duration-200
        hover:scale-105 active:scale-95
        ${variantStyle[variant]}
      `}
			>
				{icon && <span>{icon}</span>}
			</button>

			{/* Tooltip */}
			<span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
				{tooltip || label}
			</span>
		</div>
	);
}

export default ActionButton;

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarMyReservation() {
    const pathName = usePathname();
    
    return (
        <nav className="absolute top-48 left-0 right-0 mt-16">
            <ul className="flex justify-around items-center font-bold w-[80%]">
                <Link href="/my-reservations/will-come">
                    <li className={`hover:text-[#3252DF] hoverUnderline ${pathName === "/my-reservations/will-come" ? "text-[#3252DF] " : ""}`}>
                        Will come
                    </li>
                </Link>
                <Link href="/my-reservations/finished">
                    <li className={`hover:text-[#3252DF] hoverUnderline ${pathName === "/my-reservations/finished" ? "text-[#3252DF]" : ""}`}>
                        Finished
                    </li>
                </Link>
                <Link href="/my-reservations/cancelled">
                    <li className={`hover:text-[#3252DF] hoverUnderline ${pathName === "/my-reservations/cancelled" ? "text-[#3252DF] underline" : ""}`}>
                        Cancelled
                    </li>
                </Link>
            </ul>
        </nav>
    );
}

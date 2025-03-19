import Link from "next/link";
import Image from "next/image";

const Footer = () => {
	return (
		<footer
			className="w-full absolute bottom-100 left-0 right-0 py-4 px-2 mx-auto"
			style={{ backgroundImage: "url(/images/bg-footer.png)" }}
		>
			{/* Title */}
			<div className="mx-auto">
				<Link href="/">
					<p className="text-xl font-bold hover:text-gray-200 cursor-pointer text-white text-center mx-auto">
						GuestHouse Ryosuke
					</p>
				</Link>
			</div>

			{/* Sosmed, Addres */}
			<div className="mx-auto mt-4">
				<div className="flex justify-evenly items-center">
					<div className="flex lg:justify-evenly lg:items-center lg:space-x-4  lg:mr-0 space-x-2">
						{/* Sosmed */}
						<Image
							src={"/svg/icon-wa.svg"}
							alt="icon whatsapp"
							width={40}
							height={40}
						/>

						<Image
							src={"/svg/icon-mail.svg"}
							alt="icon mail"
							width={40}
							height={40}
						/>
					</div>

					{/* Addres */}

					<p className="text-white text-center text-sm w-[40%] lg:w-fit lg:text-base">
						Restaurant St, Delicious City, London 9578, UK
						masitohstore@gmail.com
					</p>

					<div className="flex lg:justify-evenly lg:items-center lg:space-x-4 space-x-2">
						{/* Sosmed-2 */}
						<Image
							src={"/svg/icon-fb.svg"}
							alt="icon fb"
							width={40}
							height={40}
						/>

						<Image
							src={"/svg/icon-ig.svg"}
							alt="icon ig"
							width={40}
							height={40}
						/>
					</div>
				</div>
			</div>

			{/* Copyright */}
			<div className="mt-6 w-1/2 mx-auto">
                <p className="text-gray-100 text-center text-xs italic lg:text-sm">
                    Copyright 2024 • All rights reserved • GuestHouse Ryosuke
                </p>
            </div>
		</footer>
	);
};

export default Footer;

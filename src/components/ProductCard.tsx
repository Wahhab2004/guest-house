import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getData } from '@/services/products'; // Pastikan import path benar

type ProductPageProps = {
	params: { slug: string[] }
}

async function ProductCard(props: ProductPageProps) {
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
	const { params } = props;
	const products = await getData(`${baseUrl}room`); // Dapatkan data dari API

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 mt-6 mx-auto max-w-7xl">
			{products.data.map((product: any) => (
				<div key={product.id} className="w-full max-w-sm bg-white border-2 border-gray-200 rounded-lg shadow-xl">
					<a href="#">
						<Image
							classsName="p-4 rounded-t-lg"
							src={product.image ? `${product.image}` : '/images/rooms/room-1.png'}
							alt={product.roomType || 'Product image'}
							width={600}
							height={300}
				
						/>
					</a>
					<div className="px-5 pb-5">
						<a href="#">
							<h5 className="text-xl font-semibold tracking-tight text-black">
								{product.roomType} {/* Tampilkan nama produk */}
							</h5>
						</a>
						<div className="flex items-center mt-2.5 mb-5">
							<div className="flex items-center space-x-1">
								{[...Array(4)].map((_, i) => (
									<svg
										key={i}
										className="w-4 h-4 text-yellow-300"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 22 20"
									>
										<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
									</svg>
								))}
								<svg
									className="w-4 h-4 text-gray-200"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 22 20"
								>
									<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
								</svg>
							</div>
							<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
								{product.rating || '5.0'} {/* Tampilkan rating */}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-3xl font-bold text-black">
								¥{product.pricePerNight || '4000'} / person {/* Tampilkan harga */}
							</span>
							<Link
								href={`/rooms/${product.id}`}
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center lg:ml-2 lg:px-3"
							>
								Booking Room
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default ProductCard;

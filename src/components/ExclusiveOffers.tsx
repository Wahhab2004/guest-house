import React from 'react';
import Image from 'next/image';

const PromoSection = () => {
    return (
        <section className="bg-white px-4 py-8 antialiased  md:py-16">
            <div className="mx-auto grid max-w-screen-xl rounded-lg  p-4  md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16">
                <div className="lg:col-span-5 lg:mt-0">
                    <a href="#">
                        <Image
                        src="/images/rooms/room-2.png"
                        alt='room image'
                        width={600}
                        height={300}
                        className="mb-4 h-full w-full  sm:h-96 sm:w-96 md:h-full md:w-full"
                        />
                    </a>
                </div>
                <div className="mx-auto place-self-center lg:col-span-7">
                    <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl mt-3 lg:mt-0">
                        Save $500 today on your purchase <br />
                        of a new iMac computer.
                    </h1>
                    <p className="mb-6 text-gray-500 dark:text-gray-400">
                        Reserve your new Apple iMac 27” today and enjoy exclusive savings with qualified activation. Pre-order now to secure your discount.
                    </p>
                    <a 
                        href="#" 
                        className="inline-flex items-center justify-center rounded-lg bg-[#1A56DB] px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 bg-primary-700"
                    >
                        Booking Now
                    </a>
                </div>
            </div>


            <div className="mx-auto grid max-w-screen-xl rounded-lg  p-4  md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16">
                <div className="lg:col-span-5 lg:mt-0 lg:hidden">
                    <a href="#">
                        <Image
                        src="/images/rooms/room-2.png"
                        alt='room image'
                        width={600}
                        height={300}
                        className="mb-4 h-full w-full sm:h-96 sm:w-96 md:h-full md:w-full"
                        />
                    </a>
                </div>
                <div className="mx-auto place-self-center lg:place-self lg:col-span-7">
                    <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl lg:text-end mt-3 lg:mt-0">
                        Save $500 today on your purchase <br />
                        of a new iMac computer.
                    </h1>
                    <p className="mb-6 text-gray-500 dark:text-gray-400 lg:text-end">
                        Reserve your new Apple iMac 27” today and enjoy exclusive savings with qualified activation. Pre-order now to secure your discount.
                    </p>

                    <div className='flex lg:justify-end items-center lg:w-full'>

                        <a 
                            href="#" 
                            className="rounded-lg bg-[#1A56DB] px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 bg-primary-700 "
                        >
                            Booking Now
                        </a>
                    </div>
                </div>

                <div className="lg:col-span-5 lg:mt-0 lg:block hidden">
                    <a href="#">
                        <Image
                        src="/images/rooms/room-2.png"
                        alt='room image'
                        width={600}
                        height={300}
                        className="mb-4 h-full w-full  sm:h-96 sm:w-96 md:h-full md:w-full"
                        />
                    </a>
                </div>
            </div>


        </section>
    );
};

export default PromoSection;

import Link from "next/link";

import { GoArrowUpRight } from "react-icons/go";
import { SlBasket } from "react-icons/sl";

const CartFallback = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex flex-col justify-center gap-8">
                <div className="flex items-center justify-center">
                    <SlBasket className="text-primary-text/80 text-9xl" />
                </div>

                <div className="flex flex-col items-center gap-6 text-center">
                    <h2 className="text-primary-text/80 mid:text-6xl text-5xl font-semibold tracking-tight">
                        Your cart is empty
                    </h2>

                    <Link
                        href="/courses"
                        className="mid:w-[180px] group bg-primary-text text-background flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm p-3 text-sm font-medium tracking-wide"
                    >
                        Explore courses
                        <GoArrowUpRight
                            size={22}
                            className="duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartFallback;

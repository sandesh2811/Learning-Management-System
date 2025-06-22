import demo from "../../../../../public/demo.png";

import { Span } from "@/components/ui/Span";
import Button from "@/components/ui/Button";

import Link from "next/link";
import Image from "next/image";
import { GoArrowUpRight, GoX } from "react-icons/go";

const CartMain = () => {
    return (
        <div className="divide-primary-text/20 flex h-full flex-col justify-between gap-3 divide-y-[1.2px] py-4">
            <h2 className="mid:text-4xl pb-4 text-2xl font-semibold tracking-tight">
                Your cart
            </h2>
            <CartItems />
            <CartFooter />
        </div>
    );
};

export default CartMain;

/* CART ITEMS COMPONENT */

const CartItems = () => {
    return (
        <div className="divide-primary-text/10 flex flex-1 flex-col gap-4 divide-y-[1.2px] overflow-y-auto">
            {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="relative flex gap-4 py-4">
                    {/* CART ITEM IMAGE */}

                    <div className="mid:flex-1 w-[100px] overflow-hidden rounded-sm">
                        <Image
                            src={demo}
                            alt="Course thumbnail"
                            className="aspect-auto object-contain"
                        />
                    </div>

                    {/* CART ITEM INFO */}

                    <div className="mid:gap-3 flex flex-1/2 flex-col justify-center gap-1">
                        <h4 className="mid:text-lg text-sm font-medium">
                            Advanced Nodejs
                        </h4>
                        <span className="mid:text-base text-sm">
                            Price: <b>Rs 5000</b>
                        </span>
                        <span className="mid:text-base text-sm">
                            Course by: Hari Bahadur
                        </span>
                    </div>

                    {/* REMOVE CART ITEM BUTTON */}

                    <Span
                        onClick={() => console.log("Hello ")}
                        className="absolute top-2.5 right-0"
                    >
                        <GoX size={22} color="red" />
                    </Span>
                </div>
            ))}
        </div>
    );
};

/* CART FOOTER COMPONENT */

const CartFooter = () => {
    return (
        <div>
            <div className="flex w-full flex-col items-end gap-3">
                <span className="text-lg font-medium">Total : Rs 5000</span>
                <div className="mid:flex-row mid:justify-end flex w-full flex-col-reverse items-center gap-4">
                    <Button
                        aria-label="Clear cart"
                        variant="skeleton"
                        className="mid:w-[150px] w-full p-3"
                    >
                        Clear cart
                    </Button>
                    <Link
                        aria-label="Checkout"
                        href="/enrollForm"
                        className="mid:w-[120px] group bg-primary-text text-background flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm p-3 text-sm font-medium tracking-wide"
                    >
                        Checkout
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

"use client";

import Button from "@/components/ui/Button";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { GoArrowUpRight } from "react-icons/go";

import { addItemsToCart, type CartItem } from "@/store/cart/cartItems";
import { RootState } from "@/store/Store";

interface CallToActionButtonsProps {
    cartItemInfo: CartItem;
}

const CallToActionButtons = ({ cartItemInfo }: CallToActionButtonsProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cartItems);

    /* Check if items already exists in cart */
    const itemAlreadyExists = cartItems.some(
        (item) => cartItemInfo.id === item.id
    );

    const setItemsToCart = () => {
        /* If items doesn't exist then set the item in cart */
        if (!itemAlreadyExists) {
            /* Dispatch necessary course info to the redux */
            dispatch(addItemsToCart(cartItemInfo));
        }
    };

    /* Handle navigation for immediate enrollment */
    const handleClick = () => {
        setItemsToCart();
        router.push("/enrollForm");
    };

    return (
        <div className="mid:justify-end flex gap-4">
            <Button
                variant="skeleton"
                onClick={handleClick}
                className="mid:w-[150px] group border-primary-text w-full font-semibold"
            >
                Enroll Now
                <GoArrowUpRight
                    size={22}
                    className="duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
                />
            </Button>

            <Link
                href="/cart"
                onClick={setItemsToCart}
                className={`mid:w-[150px] group bg-primary-text text-background flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm p-3 text-sm font-medium tracking-wide ${!!itemAlreadyExists && "bg-primary-text/60 pointer-events-none cursor-not-allowed"}`}
            >
                Add to cart
                <GoArrowUpRight
                    size={22}
                    className="duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
                />
            </Link>
        </div>
    );
};

export default CallToActionButtons;

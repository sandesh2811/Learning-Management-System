import { Span } from "@/components/ui/Span";
import Button from "@/components/ui/Button";

import Link from "next/link";
import { GoArrowUpRight, GoX } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";

import { removeSingleCartItem, resetCart } from "@/store/cart/cartItems";
import { RootState } from "@/store/Store";

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
    /* Get the cart items */
    const cartItems = useSelector((state: RootState) => state.cartItems);

    const dispatch = useDispatch();

    /* Handle single cart item remove */
    const handleCartItemRemove = (id: string) => () => {
        dispatch(removeSingleCartItem(id));
    };

    return (
        <div className="divide-primary-text/10 flex flex-1 flex-col gap-4 divide-y-[1.2px] overflow-y-auto">
            {cartItems.map((item) => (
                <div key={item.id} className="relative flex gap-4 py-4">
                    {/* CART ITEM INFO */}

                    <CartItem
                        title={item.title}
                        price={item.price}
                        duration={item.duration}
                        instructorName={item.instructorName}
                    />

                    {/* REMOVE CART ITEM BUTTON */}

                    <Span
                        onClick={handleCartItemRemove(item.id)}
                        className="absolute top-3 right-0"
                    >
                        <GoX size={22} color="red" />
                    </Span>
                </div>
            ))}
        </div>
    );
};

/* CART ITEM COMPONENT */

interface CartItemProps {
    title: string;
    price: number;
    duration: string;
    instructorName: string;
}

const CartItem = ({
    title,
    price,
    duration,
    instructorName,
}: CartItemProps) => {
    return (
        <div className="mid:gap-2 flex flex-1/2 flex-col justify-center gap-1">
            <h4 className="mid:text-lg text-sm font-medium">{title}</h4>
            <span className="mid:text-base text-sm">
                Price: <b>Rs {price}</b>
            </span>
            <span className="mid:text-base text-sm">Duration: {duration}</span>
            <span className="mid:text-base text-sm">
                Course by: {instructorName}
            </span>
        </div>
    );
};

/* CART FOOTER COMPONENT */

const CartFooter = () => {
    const dispatch = useDispatch();

    /* Clear the cart */
    const clearAllCartItems = () => {
        dispatch(resetCart());
    };

    return (
        <div>
            <div className="flex w-full flex-col items-end gap-3">
                <span className="text-lg font-medium">Total : Rs 5000</span>
                <div className="mid:flex-row mid:justify-end flex w-full flex-col-reverse items-center gap-4">
                    <Button
                        aria-label="Clear cart"
                        variant="skeleton"
                        onClick={clearAllCartItems}
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
                            className="duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1 group-focus:translate-x-1 group-focus:-translate-y-1"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

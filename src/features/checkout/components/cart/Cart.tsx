"use client";

import CartFallback from "./CartFallback";
import CartMain from "./CartMain";

import { RootState } from "@/store/Store";
import { useSelector } from "react-redux";

const Cart = () => {
    const cartItems = useSelector((state: RootState) => state.cartItems);

    return (
        <div className="h-[85vh]">
            {cartItems.length > 0 ? <CartMain /> : <CartFallback />}
        </div>
    );
};

export default Cart;

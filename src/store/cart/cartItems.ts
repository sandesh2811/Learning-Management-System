import { RootState } from "../Store";

import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: string;
    title: string;
    price: number;
    duration: string;
    instructorName: string;
};

const initialState: CartItem[] | null = [];

const CartItems = createSlice({
    name: "cart-items",
    initialState,
    reducers: {
        addItemsToCart: (state, action: PayloadAction<CartItem>) => {
            state.push(action.payload);
        },

        removeSingleCartItem: (state, action) => {
            const id = action.payload;
            return state.filter((item) => item.id !== id);
        },

        resetCart: () => initialState,
    },
});

export const SetCartItems = CartItems.reducer;

export const { addItemsToCart, removeSingleCartItem, resetCart } =
    CartItems.actions;

/* For calculating total */
const cartItems = (state: RootState) => state.cartItems;

export const cartTotal = createSelector(cartItems, (items) =>
    items.reduce((acc, curr) => acc + curr.price, 0)
);

/* For calculating cart items count */

export const totalCartItems = createSelector(
    cartItems,
    (items) => items.length
);

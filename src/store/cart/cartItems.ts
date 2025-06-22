import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

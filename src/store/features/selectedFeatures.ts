import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SelectedFiltersType = {
    type: string;
    price: string;
    duration: string | number;
    language: string;
};

const initialState: SelectedFiltersType = {
    type: "",
    price: "",
    duration: "",
    language: "",
};

const SelectedFilters = createSlice({
    name: "selected-filters",
    initialState,
    reducers: {
        getSelectedFilters: (
            state,
            action: PayloadAction<SelectedFiltersType>
        ) => {
            const { type, price, duration, language } = action.payload;

            state.type = type;
            state.price = price;
            state.duration = duration;
            state.language = language;
        },
    },
});

export const GetSelectedFilters = SelectedFilters.reducer;

export const { getSelectedFilters } = SelectedFilters.actions;

import { configureStore } from "@reduxjs/toolkit";
import { GetSelectedFilters } from "./features/selectedFeatures";

export const GlobalStore = configureStore({
    reducer: {
        selectedFilters: GetSelectedFilters,
    },
});

export type RootState = ReturnType<typeof GlobalStore.getState>;

export type AppDispatch = typeof GlobalStore.dispatch;

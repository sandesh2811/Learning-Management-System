import { Dispatch, SetStateAction } from "react";

export const clearSelectedFilters =
    (setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>) => () => {
        setSelectedFilters({ type: "", price: "", duration: "", language: "" });
    };

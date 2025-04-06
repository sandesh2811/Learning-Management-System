import { Dispatch, SetStateAction } from "react";

import { SelectedFilters } from "./setSelectedFiltersInURL";

export const clearSelectedFilters = (
    setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>
): void => {
    setSelectedFilters({ type: "", price: "", duration: "", language: "" });
};

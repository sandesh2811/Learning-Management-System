import { Dispatch, SetStateAction } from "react";

import { SelectedFilters } from "./setSelectedFiltersInURL";

const handleFilterSelection = (
    filter: string,
    displayName: string,
    setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>
): void => {
    const key = displayName.split(" ")[1].toLowerCase();

    setSelectedFilters((prev) => ({ ...prev, [key]: filter }));
};

export default handleFilterSelection;

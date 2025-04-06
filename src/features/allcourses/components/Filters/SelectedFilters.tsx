import React from "react";

import { type SelectedFilters } from "../../utils/setSelectedFiltersInURL";

type SelectedFiltersProps = {
    selectedFilters: SelectedFilters;
};

const SelectedFilters = ({ selectedFilters }: SelectedFiltersProps) => {
    return (
        <div className="flex flex-col">
            <span className="text-lg font-medium">Selected Filters</span>
            {selectedFilters.type === "" &&
            selectedFilters.price === "" &&
            selectedFilters.duration === "" &&
            selectedFilters.language === "" ? (
                <span>No filters selected</span>
            ) : (
                <div className="flex gap-4">
                    {selectedFilters.type !== "" && (
                        <span>{selectedFilters.type}</span>
                    )}
                    {selectedFilters.price !== "" && (
                        <span>{selectedFilters.price}</span>
                    )}
                    {selectedFilters.duration !== "" && (
                        <span>{selectedFilters.duration}</span>
                    )}
                    {selectedFilters.language !== "" && (
                        <span>{selectedFilters.language}</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default SelectedFilters;

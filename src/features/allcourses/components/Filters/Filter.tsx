import handleFilterSelection from "../../utils/handleFilterSelection";

import { SelectedFilters } from "../../utils/setSelectedFiltersInURL";

import { Dispatch, SetStateAction } from "react";

type FilterProps = {
    displayName: string;
    filters: string[];
    hasAdditionalChildren?: boolean;
    additionalText?: string;
    setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
};

const Filter = ({
    displayName,
    filters,
    hasAdditionalChildren,
    additionalText,
    setSelectedFilters,
}: FilterProps) => {
    return (
        <div>
            {hasAdditionalChildren ? (
                <h5 className="flex items-center gap-1 text-xl font-medium capitalize">
                    {displayName}
                    <span className="text-xs">{additionalText}</span>
                </h5>
            ) : (
                <h5 className="text-xl font-medium capitalize">
                    {displayName}
                </h5>
            )}

            <div className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                    <span
                        key={filter}
                        className="cursor-pointer"
                        onClick={() =>
                            handleFilterSelection(
                                filter,
                                displayName,
                                setSelectedFilters
                            )
                        }
                    >
                        {filter}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Filter;

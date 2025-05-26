import handleFilterSelection from "../../utils/handleFilterSelection";

import { Span } from "@/components/ui/Span";

import { Dispatch, SetStateAction } from "react";

type IndividualFilterProps = {
    displayName: string;
    filters: string[];
    hasAdditionalChildren?: boolean;
    additionalText?: string;
    setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
};

const IndividualFilter = ({
    displayName,
    filters,
    hasAdditionalChildren,
    additionalText,
    setSelectedFilters,
}: IndividualFilterProps) => {
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
                    <Span
                        role="button"
                        key={filter}
                        onClick={handleFilterSelection({
                            filter,
                            displayName,
                            setSelectedFilters,
                        })}
                    >
                        {filter}
                    </Span>
                ))}
            </div>
        </div>
    );
};

export default IndividualFilter;

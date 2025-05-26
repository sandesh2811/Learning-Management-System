import { clearSelectedFilters } from "../../utils/clearSelectedFilters";
import { setSelectedFiltersInURL } from "../../utils/setSelectedFiltersInURL";

import Button from "@/components/ui/Button";

import { Dispatch, SetStateAction } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface FiltersButtonProps {
    selectedFilters: SelectedFilters;
    setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
}

const FiltersButton = ({
    selectedFilters,
    setSelectedFilters,
}: FiltersButtonProps) => {
    const router = useRouter();

    const urlSearchParams = useSearchParams();

    return (
        <div className="flex justify-between gap-4 md:justify-end">
            <Button
                className="px-7 uppercase"
                variant="skeleton"
                onClick={clearSelectedFilters(setSelectedFilters)}
            >
                Clear
            </Button>
            <Button
                className="px-7 uppercase"
                onClick={setSelectedFiltersInURL({
                    router,
                    selectedFilters,
                    urlSearchParams,
                })}
            >
                Apply
            </Button>
        </div>
    );
};

export default FiltersButton;

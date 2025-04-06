import { useDebounceSearch } from "@/hooks/useDebounceSearch";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { forwardRef } from "react";
import { useSetSearchParam } from "../../hooks/useSetSearchParam";

type InputSearchProps = {
    customField?: unknown;
};

const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
    ({ ...props }, ref) => {
        const searchParams = useSearchParams();

        const defaultSearchValue = searchParams?.get("search") || "";
        const [searchValue, setSearchValue] =
            useState<string>(defaultSearchValue);

        // Get the debounced search query i.e. full search query after user stops typing
        const debouncedSearchQuery = useDebounceSearch(searchValue);

        // Set the search params in URL
        useSetSearchParam(debouncedSearchQuery, searchParams);

        return (
            <div>
                <input
                    ref={ref}
                    type="text"
                    placeholder="eg: frontend"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="border-secondary-text bg-background rounded-sm border-[1.2px] p-2 text-sm"
                    {...props}
                />
            </div>
        );
    }
);

InputSearch.displayName = "Filter Input";

export default InputSearch;

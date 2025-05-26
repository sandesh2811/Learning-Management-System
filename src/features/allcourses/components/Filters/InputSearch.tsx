import { useUserTypingContext } from "../../context/UserTyping";

import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import { useSetSearchParam } from "../../hooks/useSetSearchParam";

import handleInputValueChange from "../../utils/handleInputValueChange";

import { GoSearch } from "react-icons/go";
import { useSearchParams } from "next/navigation";
import { useState, forwardRef } from "react";

interface InputSearchProps {
    customField?: unknown;
}

const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
    ({ ...props }, ref) => {
        const searchParams = useSearchParams();

        const defaultSearchValue = searchParams?.get("search") || "";
        const [searchValue, setSearchValue] =
            useState<string>(defaultSearchValue);

        const { setUserTypingTrue, setUserTypingFalse } =
            useUserTypingContext();

        /* Get the debounced search query i.e. full search query after user stops typing */
        const debouncedSearchQuery = useDebounceSearch(searchValue);

        /* Set the search params in URL */
        useSetSearchParam({
            debouncedSearchQuery,
            searchParams,
            setUserTypingFalse,
        });

        return (
            <div className="group mid:max-w-[200px] relative w-full max-w-[400px]">
                <input
                    ref={ref}
                    type="text"
                    placeholder="eg: frontend"
                    value={searchValue}
                    onChange={handleInputValueChange({
                        setSearchValue,
                        setUserTypingTrue,
                    })}
                    className="border-border-color bg-background w-full rounded-sm border-[1.2px] p-2.5 text-sm shadow-xs focus:outline-[1.2px]"
                    {...props}
                />
                <GoSearch
                    className="text-primary-text/60 group-hover:text-primary-text focus:text-primary-text absolute top-3 right-2 duration-300 ease-in-out"
                    size={18}
                />
            </div>
        );
    }
);

InputSearch.displayName = "Filter Input";

export default InputSearch;

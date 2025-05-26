"use client";

import { useActiveState } from "@/hooks/useActiveState";

import clearSelectedFiltersFromURL from "../../utils/clearSelectedFiltersFromURL";

import AllFilters from "./AllFilters";
import InputSearch from "./InputSearch";
import Button from "@/components/ui/Button";
import { FiFilter } from "react-icons/fi";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FiltersWrapperProps {
    searchParams: SearchParamsType;
}

const FiltersWrapper = ({ searchParams }: FiltersWrapperProps) => {
    const { isActive, setActiveStateTrue, setActiveStateFalse } =
        useActiveState();
    const pathname = usePathname();
    const router = useRouter();
    const readOnlyUrlSearchParam = useSearchParams();
    const params = new URLSearchParams(readOnlyUrlSearchParam);

    /* Get only the keys of the URL search params which user has set */
    const userSetSearchParamsKeys = Object.keys(searchParams);

    return (
        <section className="w-full">
            <div className="mid:flex-row flex flex-col items-center justify-between gap-4">
                {/* SEARCH BAR */}

                <InputSearch />

                {/* FILTERS & CLEAR FILTER BUTTONS */}
                <div className="mid:flex-row mid:justify-end flex w-full flex-col items-center gap-4">
                    {readOnlyUrlSearchParam.size !== 0 && (
                        <Button
                            variant="courses"
                            onClick={clearSelectedFiltersFromURL({
                                userSetSearchParamsKeys,
                                params,
                                router,
                                currentPathname: pathname,
                            })}
                        >
                            Clear Filters
                        </Button>
                    )}
                    <Button onClick={setActiveStateTrue} variant="courses">
                        Filters <FiFilter />
                    </Button>
                </div>
            </div>

            {/* ALL AVAILABLE FILTERS */}
            <AllFilters
                isActive={isActive}
                setActiveStateFalse={setActiveStateFalse}
            />
        </section>
    );
};

export default FiltersWrapper;

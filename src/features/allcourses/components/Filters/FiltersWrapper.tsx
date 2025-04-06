"use client";

import AllFilters from "./AllFilters";
import InputSearch from "./InputSearch";

import { useState } from "react";

const FiltersWrapper = ({ searchParams }: { searchParams: unknown }) => {
    //Add clear filters for URL params
    const [isActive, setActive] = useState<boolean>(false);

    return (
        <section className="w-full">
            <div className="flex items-center justify-between">
                {/* SEARCH BAR */}

                <InputSearch />

                <span
                    className="cursor-pointer text-lg"
                    onClick={() => setActive(true)}
                >
                    Filters
                </span>
            </div>

            <AllFilters isActive={isActive} setActive={setActive} />
        </section>
    );
};

export default FiltersWrapper;

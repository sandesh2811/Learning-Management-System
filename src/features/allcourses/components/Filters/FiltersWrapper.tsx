"use client";

import AllFilters from "./AllFilters";

import { useState } from "react";

const FiltersWrapper = () => {
    const [isActive, setActive] = useState<boolean>(false);

    return (
        <section className="flex-1">
            {!isActive && (
                <span
                    className="cursor-pointer text-lg"
                    onClick={() => setActive(true)}
                >
                    Filters
                </span>
            )}

            <AllFilters isActive={isActive} setActive={setActive} />
        </section>
    );
};

export default FiltersWrapper;

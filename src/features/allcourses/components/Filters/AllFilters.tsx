import {
    CourseDuration,
    CourseLanguages,
    CoursePrice,
    CourseType,
} from "@/constants/Constants";

import { useAllFiltersLogic } from "../../hooks/useAllFiltersLogic";

import { Span } from "@/components/ui/Span";
import FiltersButton from "./FiltersButton";
import SelectedFilters from "./SelectedFilters";
import IndividualFilter from "./IndividualFilter";

import { GoX } from "react-icons/go";
import { createPortal } from "react-dom";
import { Suspense } from "react";

interface AllFiltersProps {
    isActive: boolean;
    setActiveStateFalse: () => void;
}

const AllFilters = ({ isActive, setActiveStateFalse }: AllFiltersProps) => {
    const { selectedFilters, setSelectedFilters, handleFilterClose } =
        useAllFiltersLogic({ isActive, setActiveStateFalse });

    return createPortal(
        <div id="course-filter">
            {/* OVERLAY */}
            <div
                className={`z-10 h-full w-full bg-gray-500/50 duration-400 ease-in-out md:absolute ${isActive ? "top-0 left-0 block" : "hidden"}`}
                onClick={handleFilterClose}
            />

            {/* FILTERS SECTION */}
            <div
                className={`bg-background absolute flex h-full w-full flex-col justify-between gap-4 p-6 md:w-[400px] ${isActive ? "visible top-0 left-0" : "invisible top-0 left-[-150%]"} z-30 duration-200 ease-in-out`}
            >
                <div className="inline-flex justify-end">
                    <Span
                        aria-label="Close filters"
                        onClick={handleFilterClose}
                    >
                        <GoX size={25} className="cursor-pointer" />
                    </Span>
                </div>

                {/* BY COURSE TYPE */}
                <IndividualFilter
                    displayName="Course Type"
                    filters={CourseType}
                    setSelectedFilters={setSelectedFilters}
                />

                {/* BY COURSE PRICE */}
                <IndividualFilter
                    displayName="Course Price"
                    filters={CoursePrice}
                    setSelectedFilters={setSelectedFilters}
                />

                {/* BY COURSE DURATION */}
                <IndividualFilter
                    displayName="Course Duration"
                    filters={CourseDuration}
                    hasAdditionalChildren={true}
                    additionalText="(in months)"
                    setSelectedFilters={setSelectedFilters}
                />

                {/* BY COURSE LANGUAGE*/}
                <IndividualFilter
                    displayName="Course Language"
                    filters={CourseLanguages}
                    setSelectedFilters={setSelectedFilters}
                />

                {/* SELECTED FILTERS */}
                <SelectedFilters selectedFilters={selectedFilters} />

                {/* FILTERS BUTTON */}
                <Suspense>
                    <FiltersButton
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                    />
                </Suspense>
            </div>
        </div>,
        document.body
    );
};

export default AllFilters;

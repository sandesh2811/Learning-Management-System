import {
    CourseDuration,
    CourseLanguages,
    CoursePrice,
    CourseType,
} from "@/constants/Constants";

import Button from "@/components/ui/Button";
import InputSearch from "./InputSearch";
import Filter from "./Filter";

import { GoX } from "react-icons/go";
import { Dispatch, SetStateAction } from "react";

const AllFilters = ({
    isActive,
    setActive,
}: {
    isActive: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <div
            className={`absolute flex h-[80vh] flex-col justify-between gap-4 rounded-2xl bg-gray-300 p-6 md:w-[400px] ${isActive ? "top-31 right-5" : "right-[-50%]"}`}
        >
            <div className="flex justify-end" onClick={() => setActive(false)}>
                <GoX size={25} className="cursor-pointer" />
            </div>
            {/* SEARCH BAR */}

            <InputSearch />

            {/* BY COURSE TYPE */}

            <Filter displayName="Course Type" filter={CourseType} />

            {/* BY COURSE PRICE */}

            <Filter displayName="Course Price" filter={CoursePrice} />

            {/* BY COURSE DURATION */}

            <Filter
                displayName="Course Duration"
                filter={CourseDuration}
                hasAdditionalChildren={true}
                additionalText="(in months)"
            />

            {/* BY COURSE LANGUAGE*/}

            <Filter displayName="Course Language" filter={CourseLanguages} />

            {/* SELECTED FILTERS */}

            <div className="flex flex-col">
                <span className="text-lg font-medium">Selected Filters</span>
                <div className="flex gap-4">
                    <span>Frontend</span>
                    <span>Low to High</span>
                    <span>4</span>
                </div>
            </div>

            {/* CTA BUTTONS */}

            <div className="flex justify-end gap-4">
                <Button className="px-7 uppercase" variant="skeleton">
                    Clear
                </Button>
                <Button className="px-7 uppercase">Apply</Button>
            </div>
        </div>
    );
};

export default AllFilters;

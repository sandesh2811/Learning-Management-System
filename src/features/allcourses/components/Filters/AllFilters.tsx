import {
    CourseDuration,
    CourseLanguages,
    CoursePrice,
    CourseType,
} from "@/constants/Constants";

import useDisableScroll from "@/hooks/useDisableScroll";

import { clearSelectedFilters } from "../../utils/clearSelectedFilters";
import { setSelectedFiltersInURL } from "../../utils/setSelectedFiltersInURL";

import Button from "@/components/ui/Button";
import Filter from "./Filter";
import SelectedFilters from "./SelectedFilters";

import { GoX } from "react-icons/go";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const AllFilters = ({
    isActive,
    setActive,
}: {
    isActive: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
}) => {
    const router = useRouter();

    const urlSearchParams = useSearchParams();

    const [selectedFilters, setSelectedFilters] = useState({
        type: "",
        price: "",
        duration: "",
        language: "",
    });

    useDisableScroll(isActive);

    return (
        <>
            {/* Overlay */}
            <div
                className={`z-10 h-full w-full bg-gray-500/50 duration-400 ease-in-out md:absolute ${isActive ? "top-0 left-0 block" : "hidden"}`}
            ></div>

            {/* Filter Section  */}
            <div
                className={`bg-background absolute flex h-full w-full flex-col justify-between gap-4 p-6 md:w-[400px] ${isActive ? "top-0 left-0" : "top-0 left-[-150%]"} z-30 duration-200 ease-in-out`}
            >
                <div
                    className="flex justify-end"
                    onClick={() => setActive(false)}
                >
                    <GoX size={25} className="cursor-pointer" />
                </div>

                {/* BY COURSE TYPE */}

                <Filter
                    displayName="Course Type"
                    filters={CourseType}
                    setSelectedFilters={setSelectedFilters}
                />

                {/* BY COURSE PRICE */}

                <Filter
                    displayName="Course Price"
                    filters={CoursePrice}
                    setSelectedFilters={setSelectedFilters}
                />

                {/* BY COURSE DURATION */}

                <Filter
                    displayName="Course Duration"
                    filters={CourseDuration}
                    hasAdditionalChildren={true}
                    additionalText="(in months)"
                    setSelectedFilters={setSelectedFilters}
                />

                {/* BY COURSE LANGUAGE*/}

                <Filter
                    displayName="Course Language"
                    filters={CourseLanguages}
                    setSelectedFilters={setSelectedFilters}
                />

                {/* SELECTED FILTERS */}

                <SelectedFilters selectedFilters={selectedFilters} />

                {/* CTA BUTTONS */}

                <div className="flex justify-between gap-4 md:justify-end">
                    <Button
                        className="px-7 uppercase"
                        variant="skeleton"
                        onClick={() => clearSelectedFilters(setSelectedFilters)}
                    >
                        Clear
                    </Button>
                    <Button
                        className="px-7 uppercase"
                        onClick={() =>
                            setSelectedFiltersInURL({
                                router,
                                selectedFilters,
                                urlSearchParams,
                            })
                        }
                    >
                        Apply
                    </Button>
                </div>
            </div>
        </>
    );
};

export default AllFilters;

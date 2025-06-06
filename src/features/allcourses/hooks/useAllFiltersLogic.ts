import { useDisableScroll } from "@/hooks/useDisableScroll";

import { removeAriaHidden, setAriaHidden } from "@/utils/ariaHidden";

import { useEffect, useState } from "react";

interface useAllFiltersLogicArgs {
    isActive: boolean;
    setActiveStateFalse: () => void;
}

export const useAllFiltersLogic = ({
    isActive,
    setActiveStateFalse,
}: useAllFiltersLogicArgs) => {
    const [selectedFilters, setSelectedFilters] = useState({
        type: "",
        price: "",
        duration: "",
        language: "",
    });

    /* Disabling scroll if filter is active */
    useDisableScroll(isActive);

    /* Setting aria hidden true and scrolling to top of the page */
    useEffect(() => {
        if (isActive) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });

            setAriaHidden({ id: "course-filter" });
        }
    }, [isActive]);

    /* Handling filter close and removing aria hidden */
    const handleFilterClose = () => {
        setActiveStateFalse();

        removeAriaHidden({ id: "course-filter" });
    };

    return {
        selectedFilters,
        setSelectedFilters,
        handleFilterClose,
    };
};

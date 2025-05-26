import { useState } from "react";

export const useActiveState = () => {
    const [isActive, setActive] = useState<boolean>(false);

    const setActiveStateTrue = () => {
        setActive(true);
    };

    const setActiveStateFalse = () => {
        setActive(false);
    };

    const toggleActiveState = () => {
        setActive((prev) => !prev);
    };

    return {
        isActive,
        setActive,
        setActiveStateTrue,
        setActiveStateFalse,
        toggleActiveState,
    };
};

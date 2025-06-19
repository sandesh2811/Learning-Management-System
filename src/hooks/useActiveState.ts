import { useCallback, useState } from "react";

export const useActiveState = () => {
    const [isActive, setActive] = useState<boolean>(false);

    const setActiveStateTrue = useCallback(() => {
        setActive(true);
    }, []);

    const setActiveStateFalse = useCallback(() => {
        setActive(false);
    }, []);

    const toggleActiveState = useCallback(() => {
        setActive((prev) => !prev);
    }, []);

    return {
        isActive,
        setActive,
        setActiveStateTrue,
        setActiveStateFalse,
        toggleActiveState,
    };
};

import { useDisableScroll } from "@/hooks/useDisableScroll";
import { useActiveState } from "@/hooks/useActiveState";

import { setAriaHidden, removeAriaHidden } from "@/utils/ariaHidden";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useLoginModalLogic = () => {
    const { isActive, setActiveStateTrue } = useActiveState();

    const router = useRouter();

    /* For setting the active state to true on first render */
    useEffect(() => {
        setActiveStateTrue();
    }, []);

    /* For making all the other child elements of the dom hierarchy hidden or non-interactive */
    useEffect(() => {
        if (isActive) {
            setAriaHidden({ id: "login-modal" });
        }
    }, [isActive]);

    /* For disabling scroll as soon as the active status is true */
    useDisableScroll(isActive);

    /* Handling the modal close on icon/button click */
    const handleModalClose = () => {
        router.back();
        removeAriaHidden({ id: "login-modal" });
    };

    return {
        handleModalClose,
    };
};

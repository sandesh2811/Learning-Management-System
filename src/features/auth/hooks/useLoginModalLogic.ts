import { useDisableScroll } from "@/hooks/useDisableScroll";
import { useActiveState } from "@/hooks/useActiveState";

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
            Array.from(document.body.children).forEach((child) => {
                if (!child.id.includes("login-modal")) {
                    child.setAttribute("aria-hidden", "true");
                    // makes the element non-interactive
                    child.setAttribute("inert", "true");
                }
            });
        }
    }, [isActive]);

    /* For disabling scroll as soon as the active status is true */
    useDisableScroll(isActive);

    /* Handling the modal close on icon/button click */
    const handleModalClose = () => {
        router.back();
        Array.from(document.body.children).forEach((child) => {
            if (!child.id.includes("login-modal")) {
                child.removeAttribute("aria-hidden");
                child.removeAttribute("inert");
            }
        });
    };

    return {
        handleModalClose,
    };
};

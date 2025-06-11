import { KeyboardEvent } from "react";

export const handleKeyDown =
    (handler: () => void) => (e: KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
            // Because spacebar causes the page to scroll
            e.preventDefault();
            handler();
        }
    };

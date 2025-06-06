import { TAGS_TO_BE_EXCLUDED } from "@/constants/Constants";

/* FOR SETTING THE ARIA LABEL HIDDEN  */
export const setAriaHidden = ({ id }: { id: string }) => {
    Array.from(document.body.children).forEach((child) => {
        if (
            !child.id.includes(id) &&
            !TAGS_TO_BE_EXCLUDED.includes(child.tagName)
        ) {
            child.setAttribute("aria-hidden", "true");
            // makes the element non-interactive
            child.setAttribute("inert", "true");
        }
    });
};

/* FOR REMOVING THE ARIA LABEL  */
export const removeAriaHidden = ({ id }: { id: string }) => {
    Array.from(document.body.children).forEach((child) => {
        if (!child.id.includes(id)) {
            child.removeAttribute("aria-hidden");
            child.removeAttribute("inert");
        }
    });
};

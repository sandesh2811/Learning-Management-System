import cn from "@/lib/cn";
import { handleKeyDown } from "@/utils/handleKeyDown";

import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

interface SpanProps
    extends PropsWithChildren,
        ComponentPropsWithoutRef<"span"> {
    onClick: () => void;
}

export const Span = ({ children, className, onClick, ...rest }: SpanProps) => {
    return (
        <span
            data-testid="accessible-span"
            tabIndex={0}
            className={cn("cursor-pointer", className)}
            onClick={onClick}
            onKeyDown={handleKeyDown(onClick)}
            {...rest}
        >
            {children}
        </span>
    );
};

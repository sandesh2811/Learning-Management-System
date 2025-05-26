import { ComponentPropsWithoutRef } from "react";

interface SpinnerProps extends ComponentPropsWithoutRef<"div"> {
    message: string;
}

const Spinner = ({ message, ...rest }: SpinnerProps) => {
    return (
        <div className="flex items-center justify-center gap-3" {...rest}>
            <div className="border-t-background border-secondary-color h-[20px] w-[20px] animate-spin rounded-full border-[2px] duration-400 ease-in-out" />
            <span data-testid="spinner">{message}</span>
        </div>
    );
};

export default Spinner;

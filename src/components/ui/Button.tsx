import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import cn from "@/lib/cn";

/* Button Variants For Different Use Cases and Viewports */

const ButtonVariants = cva(
    "p-3 flex gap-2 items-center justify-center rounded-sm tracking-wide font-medium cursor-pointer",
    {
        variants: {
            variant: {
                default: "bg-primary-text text-background",
                skeleton: "bg-transparent border-[1.2px] border-border-color",
                danger: "bg-red-600 text-background",
                courses:
                    "bg-transparent text-secondary-text hover:text-primary-text focus-visible:text-primary-text mid:max-w-[150px] w-full max-w-[400px] cursor-pointer border-[1.2px] border-border-color  px-5 py-2 tracking-wide shadow-xs duration-300 ease-in-out focus-visible:outline-[1.2px]",
            },
            size: {
                sm: "text-sm",
                md: "text-lg",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "sm",
        },
    }
);

interface ButtonProps
    extends ComponentPropsWithoutRef<"button">,
        VariantProps<typeof ButtonVariants> {
    onClick?: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, variant, size, onClick, ...props }, ref) => {
        return (
            <button
                ref={ref}
                onClick={onClick}
                className={cn(ButtonVariants({ size, variant, className }))}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;

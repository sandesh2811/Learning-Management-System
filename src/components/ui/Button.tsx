import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import cn from "@/lib/cn";

/* Button Variants For Different Use Cases and Viewports */

const ButtonVariants = cva(
    "p-3 flex gap-2 items-center rounded-[4px] tracking-wide font-medium cursor-pointer",
    {
        variants: {
            variant: {
                default: "bg-primary-text text-background",
                skeleton: "bg-transparent border-[1.5px] border-secondary-text",
                danger: "bg-red-600 text-background",
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
    customProp?: unknown;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, variant, size, ...props }, ref) => {
        return (
            <button
                ref={ref}
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

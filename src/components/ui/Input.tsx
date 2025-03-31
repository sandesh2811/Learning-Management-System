import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface InputProps<T extends FieldValues>
    extends ComponentPropsWithoutRef<"input"> {
    control: Control<T>;
    label: string;
    name: Path<T>;
}

const Input = forwardRef<
    HTMLInputElement,
    InputProps<{ [key: string]: string }>
>(({ control, type, name, placeholder, label, ...props }, ref) => {
    const {
        formState: { errors },
    } = useController({ control, name });

    return (
        <div className="relative flex w-full flex-col gap-2">
            <label
                htmlFor="username"
                className="text-sm font-medium md:text-base"
            >
                {label}
            </label>
            <input
                {...control.register(name)}
                ref={ref}
                name={name}
                type={type}
                placeholder={placeholder}
                autoComplete="off"
                className="border-secondary-text rounded-sm border-[1.2px] p-2 text-sm"
                {...props}
            />
            {errors[name] && (
                <span className="mid:text-sm text-xs text-red-600">
                    {errors[name].message?.toString()}
                </span>
            )}
        </div>
    );
});

Input.displayName = "Input With Validation";

export default Input;

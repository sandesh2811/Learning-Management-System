/* NEED TO REFACTOR IT  */

import { ComponentPropsWithoutRef, forwardRef, Ref } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
    label: string;
    error?: string;
}

const FormInput = forwardRef(
    (
        { type, placeholder, label, error, ...props }: InputProps,
        ref: Ref<HTMLInputElement>
    ) => {
        return (
            <div className="relative flex w-full flex-col gap-2">
                <label htmlFor="" className="text-sm font-medium md:text-base">
                    {label}
                </label>
                <input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    autoComplete="off"
                    className="border-secondary-text rounded-sm border-[1.2px] p-2 text-sm"
                    {...props}
                />
                {error && (
                    <span className="mid:text-sm text-xs text-red-600">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

FormInput.displayName = "Input With Validation";

export default FormInput;

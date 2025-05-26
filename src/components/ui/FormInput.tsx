import cn from "@/lib/cn";

import FormError from "./FormError";

import { GoEye, GoEyeClosed } from "react-icons/go";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { handleKeyDown } from "@/utils/handleKeyDown";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    wrapperClassName?: string;
    hasChild?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            id,
            type,
            placeholder,
            label,
            error,
            className,
            wrapperClassName,
            hasChild,
            ...rest
        },
        ref
    ) => {
        const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

        /* Custom hook to handle show and hide password logic */
        const {
            isPasswordVisible,
            makePasswordInvisible,
            makePasswordVisible,
        } = usePasswordInputLogic();

        return (
            <div
                className={cn(
                    "relative flex w-full flex-col gap-2",
                    wrapperClassName
                )}
            >
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium md:text-base"
                >
                    {label}
                </label>
                <div className="relative">
                    <input
                        id={inputId}
                        ref={ref}
                        type={isPasswordVisible ? "string" : type}
                        placeholder={placeholder}
                        autoComplete="off"
                        className={cn(
                            "border-secondary-text w-full rounded-sm border-[1.2px] p-2 text-sm",
                            className
                        )}
                        {...rest}
                    />
                    <PasswordVisibilityIcon
                        hasChild={hasChild}
                        isPasswordVisible={isPasswordVisible}
                        makePasswordInvisible={makePasswordInvisible}
                        makePasswordVisible={makePasswordVisible}
                    />
                </div>

                <FormError error={error} />
            </div>
        );
    }
);

FormInput.displayName = "Login Form Input";

export default FormInput;

/* SHOW OR HIDE THE PASSWORD VISIBILITY ICON */

interface PasswordVisibilityIconProps {
    hasChild?: boolean;
    isPasswordVisible: boolean;
    makePasswordInvisible: () => void;
    makePasswordVisible: () => void;
}

const PasswordVisibilityIcon = ({
    hasChild,
    isPasswordVisible,
    makePasswordInvisible,
    makePasswordVisible,
}: PasswordVisibilityIconProps) => {
    return (
        <>
            {hasChild && (
                <div className="absolute top-2.5 right-2.5">
                    {!isPasswordVisible ? (
                        <span
                            tabIndex={0}
                            aria-label="Password invisible"
                            onClick={makePasswordVisible}
                            onKeyDown={handleKeyDown(makePasswordVisible)}
                        >
                            <GoEyeClosed className="cursor-pointer" />
                        </span>
                    ) : (
                        <span
                            tabIndex={0}
                            aria-label="Password visible"
                            onClick={makePasswordInvisible}
                            onKeyDown={handleKeyDown(makePasswordInvisible)}
                        >
                            <GoEye className="cursor-pointer" />
                        </span>
                    )}
                </div>
            )}
        </>
    );
};

PasswordVisibilityIcon.displayName = "Password-Visibility-Icon";

/* CUSTOM HOOK FOR PASSWORD INPUT LOGIC */

const usePasswordInputLogic = () => {
    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

    const makePasswordVisible = () => {
        setPasswordVisible(true);
    };

    const makePasswordInvisible = () => {
        setPasswordVisible(false);
    };

    return {
        isPasswordVisible,
        makePasswordInvisible,
        makePasswordVisible,
    };
};

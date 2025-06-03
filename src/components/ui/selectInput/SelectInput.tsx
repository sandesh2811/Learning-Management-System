// Add accessibilty and refactor the overall component

import { useActiveState } from "@/hooks/useActiveState";

import { handleKeyDown } from "@/utils/handleKeyDown";

import FormError from "../FormError";
import SelectOptions from "./SelectOptions";
import LabelAndSelect from "./LabelAndSelect";

import { forwardRef, useState } from "react";
import { Control, useController } from "react-hook-form";
import cn from "@/lib/cn";

const defaultValue = "None";

export interface SelectInputOptions {
    label: string;
    value: string;
}

interface SelectInputProps {
    options: SelectInputOptions[];
    control: Control<any>;
    name: string;
    fieldName: string;
    wrapperClassName?: string;
}

const SelectInput = forwardRef<HTMLDivElement, SelectInputProps>(
    ({ options, control, name, fieldName, wrapperClassName }, ref) => {
        const [selectedValue, setSelectedValue] =
            useState<string>(defaultValue);

        /* For form validation */
        const {
            fieldState: { error },
            field: { onChange },
        } = useController({ name, control });

        /* Get the active state and respective functions */
        const { isActive, setActiveStateFalse, toggleActiveState } =
            useActiveState();

        return (
            <div
                className={cn(
                    "relative flex h-full w-full flex-col gap-2 md:w-[250px]",
                    wrapperClassName
                )}
            >
                {/* Label and External Select UI */}
                <LabelAndSelect
                    ref={ref}
                    fieldName={fieldName}
                    isActive={isActive}
                    selectedValue={selectedValue}
                    onChange={toggleActiveState}
                    onKeyDown={handleKeyDown(toggleActiveState)}
                />

                {/* Select Input Options */}
                <SelectOptions
                    isActive={isActive}
                    onChange={onChange}
                    options={options}
                    setActiveStateFalse={setActiveStateFalse}
                    setSelectedValue={setSelectedValue}
                />

                {/* Form Error */}
                <FormError error={error?.message} />
            </div>
        );
    }
);

SelectInput.displayName = "Role-Select-Input";

export default SelectInput;

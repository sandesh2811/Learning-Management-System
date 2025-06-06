// Add accessibilty and refactor the overall component

import { useSelectInputLogic } from "@/hooks/useSelectInputLogic";

import { handleKeyDown } from "@/utils/handleKeyDown";

import cn from "@/lib/cn";

import FormError from "../FormError";
import SelectOptions from "./SelectOptions";
import LabelAndSelect from "./LabelAndSelect";

import { forwardRef } from "react";
import { Control } from "react-hook-form";

export interface SelectInputOptions {
    label: string;
    value: string;
}

interface SelectInputProps {
    options: SelectInputOptions[];
    control: Control<any>;
    name: string;
    fieldName: string;
    success?: boolean;
    wrapperClassName?: string;
}

const SelectInput = forwardRef<HTMLDivElement, SelectInputProps>(
    ({ options, control, name, fieldName, success, wrapperClassName }, ref) => {
        const {
            isActive,
            error,
            selectedValue,
            onChange,
            toggleActiveState,
            setActiveStateFalse,
            setSelectedValue,
        } = useSelectInputLogic({ name, control, success });

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

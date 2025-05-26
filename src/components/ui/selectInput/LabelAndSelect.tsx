import { GoChevronUp } from "react-icons/go";
import { ForwardedRef, KeyboardEvent } from "react";

interface LabelAndSelectProps {
    fieldName: string;
    selectedValue: string;
    isActive: boolean;
    ref: ForwardedRef<HTMLDivElement>;
    onChange: () => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const LabelAndSelect = ({
    ref,
    fieldName,
    isActive,
    selectedValue,
    onChange,
    onKeyDown,
}: LabelAndSelectProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="role" className="text-sm font-medium md:text-base">
                {fieldName}
            </label>
            <div
                id="role"
                ref={ref}
                tabIndex={0}
                className="border-secondary-text flex cursor-pointer items-center justify-between rounded-sm border-[1.2px] p-2"
                onClick={onChange}
                onKeyDown={onKeyDown}
            >
                <span className="text-sm">{selectedValue}</span>
                <GoChevronUp
                    size={18}
                    className={`${!isActive && "rotate-180"} duration-300 ease-in-out`}
                />
            </div>
        </div>
    );
};

export default LabelAndSelect;

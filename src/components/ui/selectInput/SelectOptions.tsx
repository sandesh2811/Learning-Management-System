import { Dispatch, MouseEvent, SetStateAction } from "react";

import { AnimatePresence, motion as m } from "motion/react";
import { type SelectInputOptions } from "./SelectInput";

interface SelectOptionsProps {
    isActive: boolean;
    options: SelectInputOptions[];
    onChange: (value: string) => void;
    setActiveStateFalse: () => void;
    setSelectedValue: Dispatch<SetStateAction<string>>;
}

const SelectOptions = ({
    isActive,
    options,
    onChange,
    setSelectedValue,
    setActiveStateFalse,
}: SelectOptionsProps) => {
    /* Handle option select function */
    const handleOptionSelect =
        (value: string) => (e: MouseEvent<HTMLSpanElement>) => {
            e.stopPropagation();
            onChange(value);
            setSelectedValue(value);
            setActiveStateFalse();
        };

    return (
        <AnimatePresence>
            {isActive && (
                <m.div
                    key="options-container"
                    initial={{
                        scale: 0.95,
                        opacity: 0,
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                    }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                    }}
                    className={`divide-secondary-text bg-background/80 border-secondary-text absolute top-20 z-50 w-full divide-y-[1.2px] rounded-sm border-[1.2px] backdrop-blur-md`}
                >
                    {options.map((option) => (
                        <div
                            tabIndex={0}
                            key={option.label}
                            className="hover:bg-secondary-text/20 flex cursor-pointer flex-col gap-3 p-3 duration-300 ease-in-out"
                        >
                            <label hidden htmlFor="option">
                                {option.label}
                            </label>
                            <span
                                id="option"
                                onClick={handleOptionSelect(option.value)}
                                className="text-sm"
                            >
                                {option.value}
                            </span>
                        </div>
                    ))}
                </m.div>
            )}
        </AnimatePresence>
    );
};

export default SelectOptions;

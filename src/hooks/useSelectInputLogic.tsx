import { useActiveState } from "./useActiveState";

import { useEffect, useState } from "react";
import { Control, useController } from "react-hook-form";

type SelectInputLogicArgs = {
    name: string;
    control: Control<any>;
    success?: boolean;
};

const defaultValue = "None";

export const useSelectInputLogic = ({
    name,
    control,
    success,
}: SelectInputLogicArgs) => {
    const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

    /* For form validation */
    const {
        fieldState: { error },
        field: { onChange },
    } = useController({ name, control });

    /* Get the active state and respective functions */
    const { isActive, setActiveStateFalse, toggleActiveState } =
        useActiveState();

    /* Reset the form values */
    useEffect(() => {
        if (success) {
            setSelectedValue(defaultValue);
        }
    }, [success]);

    return {
        error,
        isActive,
        selectedValue,
        onChange,
        toggleActiveState,
        setSelectedValue,
        setActiveStateFalse,
    };
};

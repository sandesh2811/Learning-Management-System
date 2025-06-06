import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Control, useController } from "react-hook-form";

type FileInputLogicArgs = {
    name: string;
    control: Control<any>;
    success: boolean;
};

export const useFileInputLogic = ({
    name,
    control,
    success,
}: FileInputLogicArgs) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const internalInputRef = useRef<HTMLInputElement | null>(null);

    /* For form validation */
    const {
        field: { ref, onChange },
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    /* Handling file select */
    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setSelectedFile(file);
            onChange(file);
        }
    };

    /* Handling label click to open file selector */
    const handleLabelClick = () => {
        internalInputRef.current?.click();
    };

    /* Reset the form values */
    useEffect(() => {
        if (success) {
            setSelectedFile(null);
        }
    }, [success]);

    return {
        error,
        selectedFile,
        ref,
        internalInputRef,
        handleFileSelect,
        handleLabelClick,
    };
};

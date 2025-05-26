import { ChangeEvent, useRef, useState } from "react";
import { Control, useController } from "react-hook-form";

export const useFileInputLogic = ({
    name,
    control,
}: {
    name: string;
    control: Control<any>;
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const internalInputRef = useRef<HTMLInputElement | null>(null);

    const {
        field: { ref, onChange },
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setSelectedFile(file);
            onChange(file);
        }
    };

    const handleLabelClick = () => {
        internalInputRef.current?.click();
    };

    return {
        error,
        selectedFile,
        ref,
        internalInputRef,
        handleFileSelect,
        handleLabelClick,
    };
};

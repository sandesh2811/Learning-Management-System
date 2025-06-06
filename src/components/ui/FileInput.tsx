// Refactor the component

import { useFileInputLogic } from "@/hooks/useFileInputLogic";

import Button from "./Button";

import { ComponentPropsWithoutRef, forwardRef } from "react";
import { GoUpload } from "react-icons/go";
import { Control } from "react-hook-form";

interface FileInputProps extends ComponentPropsWithoutRef<"input"> {
    title: string;
    control: Control<any>;
    name: string;
    success: boolean;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
    ({ title, control, name, success }, forwardedRef) => {
        const {
            error,
            selectedFile,
            ref,
            internalInputRef,
            handleFileSelect,
            handleLabelClick,
        } = useFileInputLogic({ name, control, success });

        return (
            <div className="flex w-full flex-col gap-2">
                <span className="text-sm font-medium md:text-base">
                    {title}
                </span>

                {/* CUSTOM FILE UPLOAD BUTTON */}
                <Button
                    type="button"
                    variant="skeleton"
                    className="border-secondary-text justify-start border-[1.2px] p-2 font-normal"
                    onClick={handleLabelClick}
                >
                    <GoUpload size={18} />
                    Upload
                </Button>

                {/* FILE NAME AND ERROR MESSAGE  */}
                <div>
                    <input
                        ref={(input) => {
                            // For internal ref
                            internalInputRef.current = input;
                            // For RHF
                            ref(input);
                            if (typeof forwardedRef === "function") {
                                forwardedRef(input);
                            } else if (forwardedRef) {
                                forwardedRef.current = input;
                            }
                        }}
                        id="custom-file-input"
                        type="file"
                        hidden
                        onChange={handleFileSelect}
                    />
                    <span className="text-sm font-light">
                        {selectedFile?.name}
                    </span>
                    {error && (
                        <span className="mid:text-sm text-error-text text-xs">
                            {error.message}
                        </span>
                    )}
                </div>
            </div>
        );
    }
);

FileInput.displayName = "Custom-File-Upload";

export default FileInput;

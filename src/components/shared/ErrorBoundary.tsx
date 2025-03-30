"use client";

import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Button from "../ui/Button";

export const ErrorBoundaryWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
                <div className="flex flex-col items-center justify-center gap-4 text-red-500">
                    <span className="text-[clamp(5rem,15vw+1rem,8rem)]">
                        404
                    </span>
                    <span className="">Error: {error.message}</span>
                    <Button size="md">Retry?</Button>
                </div>
            )}
        >
            {children}
        </ErrorBoundary>
    );
};

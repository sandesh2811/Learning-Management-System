"use client";

import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Button from "../ui/Button";

export const ErrorBoundaryWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => {
                const parsedError = JSON.parse(error.message);
                return (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <span className="text-[clamp(5rem,15vw+1rem,8rem)]">
                            {parsedError?.statusCode ?? 500}
                        </span>
                        <span className="">Error: {parsedError.message}</span>
                        <Button size="md">Retry?</Button>
                    </div>
                );
            }}
        >
            {children}
        </ErrorBoundary>
    );
};

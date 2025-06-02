"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "../ui/Button";

import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ErrorBoundaryWrapperProps {
    children: ReactNode;
    subErrorMessage?: string;
    showButton: boolean;
}

export const ErrorBoundaryWrapper = ({
    children,
    showButton,
    subErrorMessage,
}: ErrorBoundaryWrapperProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <ErrorBoundary
            resetKeys={[searchParams.toString()]}
            fallbackRender={({ error }) => {
                const parsedError = JSON.parse(error.message);
                return (
                    <ErrorUI
                        errorMessage={parsedError.message}
                        subErrorMessage={subErrorMessage}
                        showButton={showButton}
                        router={router}
                    />
                );
            }}
        >
            {children}
        </ErrorBoundary>
    );
};

/* ERROR COMPONENT */

interface ErrorUIProps {
    errorMessage?: string;
    subErrorMessage?: string;
    router: AppRouterInstance;
    showButton: boolean;
}

export const ErrorUI = ({
    errorMessage,
    subErrorMessage,
    showButton,
    router,
}: ErrorUIProps) => {
    return (
        <div className="flex h-[50vh] flex-col items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
                <span className="text-center text-5xl font-semibold tracking-tight md:text-7xl">
                    {errorMessage ? errorMessage : "Oops! Something went wrong"}
                </span>
                <p className="text-primary-text/80 text-base md:text-lg">
                    {subErrorMessage}
                </p>
            </div>
            {showButton && (
                <div className="flex justify-center">
                    <Button onClick={() => router.push("/")} size="sm">
                        Back to home
                    </Button>
                </div>
            )}
        </div>
    );
};

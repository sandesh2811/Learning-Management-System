import { useActionState, useTransition } from "react";

export const useHandleForm = <T>(
    handler: (_: unknown, data: T) => Promise<ReturnState>,
    initialState: ReturnState
) => {
    const [state, action, isLoading] = useActionState(handler, initialState);
    const [isPending, startTransition] = useTransition();

    const formAction = (data: T) => {
        startTransition(() => {
            action(data);
        });
    };

    return {
        state,
        action: formAction,
        isPending: isPending || isLoading,
    };
};

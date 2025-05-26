import { useEffect } from "react";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";

interface useSetSearchParamProps {
    debouncedSearchQuery: string;
    searchParams: ReadonlyURLSearchParams;
    setUserTypingFalse: () => void;
}

export const useSetSearchParam = ({
    debouncedSearchQuery,
    searchParams,
    setUserTypingFalse,
}: useSetSearchParamProps): void => {
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (debouncedSearchQuery) {
            params.set("search", debouncedSearchQuery);
        } else {
            params.delete("search");
        }

        router.replace(`?${params.toString()}`);

        setUserTypingFalse();
    }, [debouncedSearchQuery, router, searchParams]);
};

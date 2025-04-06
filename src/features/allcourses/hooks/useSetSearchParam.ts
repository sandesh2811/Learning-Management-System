import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useSetSearchParam = (
    debouncedSearchQuery: string,
    searchParams: unknown
): void => {
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        if (debouncedSearchQuery) {
            params.set("search", debouncedSearchQuery);
        } else {
            params.delete("search");
        }

        router.replace(`?${params.toString()}`);
    }, [debouncedSearchQuery, router, searchParams]);
};

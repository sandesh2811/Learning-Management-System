import { useEffect, useState } from "react";

export const useDebounceSearch = <T>(value: T, delay = 500) => {
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<T>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearchQuery(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedSearchQuery;
};

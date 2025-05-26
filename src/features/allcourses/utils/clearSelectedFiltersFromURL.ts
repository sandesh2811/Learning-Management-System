import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface clearSelectedFiltersFromURLProps {
    userSetSearchParamsKeys: string[];
    params: URLSearchParams;
    router: AppRouterInstance;
    currentPathname: string;
}

const clearSelectedFiltersFromURL =
    ({
        userSetSearchParamsKeys,
        params,
        router,
        currentPathname,
    }: clearSelectedFiltersFromURLProps) =>
    () => {
        for (const userSetSearchParamKey of userSetSearchParamsKeys) {
            params.delete(userSetSearchParamKey);
        }

        router.push(`${currentPathname}${params.toString()}`);
    };

export default clearSelectedFiltersFromURL;

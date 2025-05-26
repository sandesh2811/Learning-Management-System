import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

interface SetSelectedFiltersProps {
    selectedFilters: SelectedFilters;
    urlSearchParams: ReadonlyURLSearchParams;
    router: AppRouterInstance;
}

export const setSelectedFiltersInURL =
    ({ urlSearchParams, selectedFilters, router }: SetSelectedFiltersProps) =>
    (): void => {
        const params = new URLSearchParams(urlSearchParams);

        if (selectedFilters.type) {
            params.set("type", selectedFilters.type);
        }

        if (selectedFilters.price) {
            params.set("price", selectedFilters.price);
        }

        if (selectedFilters.duration) {
            params.set("duration", selectedFilters.duration);
        }

        if (selectedFilters.language) {
            params.set("language", selectedFilters.language);
        }

        router.push(`?${params.toString()}`);
    };

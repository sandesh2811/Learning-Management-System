import { Dispatch, SetStateAction } from "react";

interface HandleFilterSelectionProps {
    filter: string;
    displayName: string;
    setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
}

const handleFilterSelection =
    ({ filter, displayName, setSelectedFilters }: HandleFilterSelectionProps) =>
    (): void => {
        const key = displayName.split(" ")[1].toLowerCase();

        setSelectedFilters((prev) => ({ ...prev, [key]: filter }));
    };

export default handleFilterSelection;

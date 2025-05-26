"use client";

import { useGetAllCourses } from "../../hooks/useGetAllCourses";

import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

const PaginationButton = ({
    searchParams,
}: {
    searchParams: SearchParamsType;
}) => {
    const { fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
        useGetAllCourses(searchParams);

    return (
        <div className="flex justify-center">
            {hasNextPage && !isError && (
                <Button
                    aria-label="Load more button"
                    disabled={isFetchingNextPage}
                    onClick={fetchNextPage}
                    className={`${isFetchingNextPage && "bg-primary-text/80 cursor-not-allowed"}`}
                >
                    {isFetchingNextPage ? (
                        <Spinner message="Loading..." />
                    ) : (
                        "Load more"
                    )}
                </Button>
            )}
        </div>
    );
};

export default PaginationButton;

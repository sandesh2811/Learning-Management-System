type FilterProps = {
    displayName: string;
    filter: string[];
    hasAdditionalChildren?: boolean;
    additionalText?: string;
};

const Filter = ({
    displayName,
    filter,
    hasAdditionalChildren,
    additionalText,
}: FilterProps) => {
    return (
        <div>
            {hasAdditionalChildren ? (
                <h5 className="flex items-center gap-1 text-xl font-medium capitalize">
                    {displayName}
                    <span className="text-xs">{additionalText}</span>
                </h5>
            ) : (
                <h5 className="text-xl font-medium capitalize">
                    {displayName}
                </h5>
            )}

            <div className="flex flex-wrap gap-3">
                {filter.map((course) => (
                    <span key={course} className="cursor-pointer">
                        {course}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Filter;

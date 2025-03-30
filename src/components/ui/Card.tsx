type CardProps = {
    title: string;
    description: string;
    price: number;
    authorName: string;
    type: string;
    image: string;
};

const Card = ({
    authorName,
    description,
    title,
    price,
    type,
    image,
}: CardProps) => {
    return (
        <div className="bg-secondary-background relative flex min-h-[50vh] max-w-[400px] flex-col overflow-hidden rounded-xl md:max-w-[500px]">
            {/* Image */}
            <CardImage imageUrl={image} />

            {/* Content */}
            <CardContent
                title={title}
                description={description}
                price={price}
                authorName={authorName}
            />

            {/* Course type */}
            <span className="bg-secondary-color text-background absolute top-4 right-4 rounded-sm p-2 text-xs font-light tracking-wider">
                {type}
            </span>
        </div>
    );
};

export default Card;

type CardContentProps = Omit<CardProps, "type" | "image">;

const CardContent = ({
    title,
    description,
    authorName,
    price,
}: CardContentProps) => {
    return (
        <div className="flex flex-1 flex-col justify-between gap-6 p-4">
            {/* Title and subtitle */}

            <div className="flex flex-col gap-1">
                <h3 className="text-[clamp(0.5rem,1.5vw+1rem,1.5rem)] font-medium tracking-tight capitalize">
                    {title}
                </h3>

                <p className="text-sm font-light text-pretty break-words">
                    {description.length > 100
                        ? description.slice(0, 100).concat("...")
                        : description}
                </p>
            </div>

            {/* Mentor and course price */}

            <div className="flex justify-between">
                <span className="text-sm font-light md:text-base">
                    Mentor: {authorName}
                </span>
                <span className="text-sm md:text-base">
                    Price : <b>${price}</b>
                </span>
            </div>
        </div>
    );
};

const CardImage = ({ imageUrl }: { imageUrl: string }) => {
    return <div className="bg-primary-text flex-1"></div>;
};

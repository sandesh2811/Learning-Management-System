import demo from "../../../public/demo.png";

import cn from "@/lib/cn";

import { LiaUser } from "react-icons/lia";
import { GoStarFill } from "react-icons/go";

import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";
import Image from "next/image";

const CardVariants = cva(
    "group relative flex flex-col rounded-xl cursor-pointer bg-secondary-background min-h-[40vh] shadow-md",
    {
        variants: {
            variant: {
                default: "",
            },
            size: {
                default: "max-w-[400px] md:max-w-[500px]",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

interface CardProps
    extends ComponentPropsWithoutRef<"div">,
        VariantProps<typeof CardVariants> {
    title: string;
    price: number;
    authorName: string;
    type: string;
    image: string;
    rating: number;
}

const Card = ({
    authorName,
    title,
    price,
    type,
    rating,
    image,
    variant,
    size,
    className,
    ...rest
}: CardProps) => {
    return (
        <div
            className={cn(CardVariants({ size, variant, className }))}
            {...rest}
        >
            {/* Image */}
            <CardImage imageUrl={image} />

            {/* Content */}
            <CardContent
                rating={rating}
                title={title}
                price={price}
                authorName={authorName}
            />

            {/* Course type */}
            {type && (
                <span className="bg-secondary-color text-background absolute top-4 right-4 rounded-sm p-2 text-xs font-light tracking-wider">
                    {type}
                </span>
            )}
        </div>
    );
};

export default Card;

type CardContentProps = Omit<CardProps, "type" | "image">;

const CardContent = ({
    title,
    rating,
    authorName,
    price,
}: CardContentProps) => {
    return (
        <div className="flex h-40 items-center px-4">
            <div className="bg-background flex w-full flex-col justify-between gap-6 rounded-lg p-4">
                {/* Title and subtitle */}

                <div className="flex justify-between gap-1">
                    <h3 className="text-[clamp(0.1rem,0.5vw+1rem,1.05rem)] font-medium tracking-tight capitalize">
                        {title}
                    </h3>

                    <span className="inline-flex items-center gap-1 text-sm">
                        {rating} <GoStarFill className="text-amber-400" />
                    </span>
                </div>

                {/* Mentor and course price */}

                <div className="flex justify-between">
                    <span className="text-sm font-medium md:text-base">
                        Rs : {price}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-light md:text-base">
                        <LiaUser /> {authorName}
                    </span>
                </div>
            </div>
        </div>
    );
};

const CardImage = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div className="bg-primary-text overflow-hidden rounded-t-2xl">
            <Image
                src={demo}
                alt="Course Thumbnail"
                className="aspect-auto duration-300 ease-in-out group-hover:scale-105"
            />
        </div>
    );
};

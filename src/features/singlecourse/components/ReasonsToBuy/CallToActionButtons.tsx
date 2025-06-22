"use client";

import Button from "@/components/ui/Button";

import { GoArrowUpRight } from "react-icons/go";

import { useRouter } from "next/navigation";
import Link from "next/link";

const CallToActionButtons = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/enrollForm");
    };

    return (
        <div className="mid:justify-end flex gap-4">
            <Button
                variant="skeleton"
                onClick={handleClick}
                className="mid:w-[150px] group border-primary-text w-full font-semibold"
            >
                Enroll Now
                <GoArrowUpRight
                    size={22}
                    className="duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
                />
            </Button>

            <Link
                href="/cart"
                className="mid:w-[150px] group bg-primary-text text-background flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm p-3 text-sm font-medium tracking-wide"
            >
                Add to cart
                <GoArrowUpRight
                    size={22}
                    className="duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
                />
            </Link>
        </div>
    );
};

export default CallToActionButtons;

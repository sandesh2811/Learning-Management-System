"use client";

import Button from "@/components/ui/Button";

import { GoArrowUpRight } from "react-icons/go";

import { useRouter } from "next/navigation";

const EnrollNowButton = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/enrollForm");
    };

    return (
        <div className="mid:justify-end flex">
            <Button
                onClick={handleClick}
                className="mid:w-[150px] group w-full font-semibold"
            >
                Enroll Now
                <GoArrowUpRight
                    size={22}
                    className="duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
                />
            </Button>
        </div>
    );
};

export default EnrollNowButton;

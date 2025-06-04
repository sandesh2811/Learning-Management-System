"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const ButtonContainer = () => {
    const router = useRouter();

    return (
        <div className="flex w-full justify-center">
            <Button
                onClick={() => router.push("/")}
                className="mid:w-[200px] w-full p-3 text-base"
                size="md"
            >
                Back to home
            </Button>
        </div>
    );
};

export default ButtonContainer;

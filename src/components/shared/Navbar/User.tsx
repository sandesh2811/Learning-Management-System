import demo from "../../../../public/demo.png";

import { useActiveState } from "@/hooks/useActiveState";

import Dropdown from "./Dropdown";
import { Span } from "@/components/ui/Span";

import Image from "next/image";
import { GoBell } from "react-icons/go";
import { AnimatePresence } from "motion/react";

const User = () => {
    const { isActive, toggleActiveState } = useActiveState();

    return (
        <div className="relative flex items-center gap-6">
            <Span
                onClick={() => console.log("demo notification")}
                className="bg-secondary-background rounded-full p-2"
            >
                <GoBell size={25} />
            </Span>
            <span
                onClick={toggleActiveState}
                className="bg-primary-text relative flex size-10 cursor-pointer items-center overflow-hidden rounded-full"
            >
                <Image
                    src={demo}
                    alt="User"
                    className="object-cover duration-300 ease-in-out group-hover:scale-105"
                    fill
                />
            </span>

            <AnimatePresence>
                {!!isActive && <Dropdown isActive={isActive} />}
            </AnimatePresence>
        </div>
    );
};

export default User;

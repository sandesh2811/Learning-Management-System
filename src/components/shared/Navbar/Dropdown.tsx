import { USER_BASED_LINKS } from "@/constants/Constants";

import { DropDownVariant } from "@/animation/variants";

import { RootState } from "@/store/Store";

import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { useSelector } from "react-redux";
import { motion as m } from "motion/react";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { setAriaHidden } from "@/utils/ariaHidden";

interface DropdownProps {
    isActive: boolean;
}

const Dropdown = ({ isActive }: DropdownProps) => {
    const loggedInUser = useSelector((state: RootState) => state.loggedinUser);

    useEffect(() => {
        if (isActive) {
            setAriaHidden({
                id: "user-controls-dropdown",
                additionalId: "user-image",
            });
        }
    }, [isActive]);

    return createPortal(
        <div
            id="user-controls-dropdown"
            className="absolute top-[65px] right-[0px]"
        >
            {!!isActive && (
                <m.div
                    variants={DropDownVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="divide-primary-text/80 bg-primary-text/30 z-10 flex min-h-[10vh] w-[200px] flex-col gap-2 divide-y-[1.2px] rounded-md p-4 backdrop-blur-lg lg:w-[250px]"
                >
                    {USER_BASED_LINKS.map((link) => {
                        if (loggedInUser.role === "Student") {
                            if (link.title === "Dashboard") {
                                return;
                            }
                        }

                        if (loggedInUser.role === "Teacher") {
                            if (link.title === "Purchased Courses") {
                                return;
                            }
                        }

                        return (
                            <Link
                                className="group flex cursor-pointer items-center justify-between py-2 text-[15px] font-medium lg:text-base"
                                key={link.title}
                                href={`${link.href}/${loggedInUser.username}`}
                                prefetch={true}
                            >
                                {link.title}

                                <GoArrowUpRight
                                    size={20}
                                    className="duration-300 ease-in-out group-hover:translate-x-2 group-hover:-translate-y-2"
                                />
                            </Link>
                        );
                    })}
                </m.div>
            )}
        </div>,
        document.body
    );
};

export default Dropdown;

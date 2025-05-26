import { Links } from "@/constants/Constants";

import { useDisableScroll } from "@/hooks/useDisableScroll";

import { preventNavigationFromSamePageToSamePage } from "@/utils/preventNavigationFromSamePageToSamePage";

import { SlideDownVariant } from "@/animation/variants";

import { FiX } from "react-icons/fi";
import { motion as m } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarMobileProps {
    isActive: boolean;
    setActiveStateFalse: () => void;
}

const NavbarMobile = ({ isActive, setActiveStateFalse }: NavbarMobileProps) => {
    /* Disable scroll if navbar active*/
    useDisableScroll(isActive);

    const pathname = usePathname();

    return (
        <m.nav
            variants={SlideDownVariant}
            initial="initial"
            animate="enter"
            exit="exit"
            className="absolute top-0 right-0 z-50 h-screen w-full"
        >
            <div className="bg-primary-text text-background flex h-full flex-col p-6">
                <div className="flex justify-end">
                    <FiX
                        size={25}
                        onClick={setActiveStateFalse}
                        className="mt-2 cursor-pointer"
                    />
                </div>
                <div className="flex h-[60vh] flex-col items-end justify-center tracking-wide">
                    {Links.map((link) => {
                        if (link.title === "Login") {
                            return;
                        }

                        return (
                            <span
                                key={link.title}
                                onClick={setActiveStateFalse}
                            >
                                <Link
                                    onClick={preventNavigationFromSamePageToSamePage(
                                        { href: link.href, pathname }
                                    )}
                                    href={link.href}
                                    className="text-secondary-color text-[2.5rem] leading-[50px] font-medium uppercase"
                                >
                                    {link.title}
                                </Link>
                            </span>
                        );
                    })}
                </div>
            </div>
        </m.nav>
    );
};

export default NavbarMobile;

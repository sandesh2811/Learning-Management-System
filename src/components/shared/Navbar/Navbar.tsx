"use client";

import { Links } from "@/constants/Constants";

import { FiX, FiMenu } from "react-icons/fi";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion as m } from "motion/react";
import { SlideDownVariant } from "@/animation/variants";
import useDisableScroll from "@/hooks/useDisableScroll";

const Navbar = () => {
    const [isActive, setActive] = useState<boolean>(false);

    /* Disable scroll if navbar active*/
    useDisableScroll(isActive);

    return (
        <header className="flex h-[5vh] items-center justify-between">
            <h1 className="font-semibold tracking-wide">LOGO</h1>

            {/* Mobile Navbar */}
            <FiMenu
                size={25}
                onClick={() => setActive(true)}
                className="cursor-pointer md:hidden"
            />
            <AnimatePresence mode="wait">
                {isActive && (
                    <NavbarMobile key="mobile-navbar" setActive={setActive} />
                )}
            </AnimatePresence>

            <NavbarLaptop />
        </header>
    );
};

export default Navbar;

type NavbarProps = {
    setActive: Dispatch<SetStateAction<boolean>>;
};

const NavbarMobile = ({ setActive }: NavbarProps) => {
    return (
        <m.nav
            variants={SlideDownVariant}
            initial="initial"
            animate="enter"
            exit="exit"
            className="absolute top-0 right-0 h-screen w-full"
        >
            <div className="bg-primary-text text-background flex h-full flex-col p-6">
                <div className="flex justify-end">
                    <FiX
                        size={25}
                        onClick={() => setActive(false)}
                        className="mt-2 cursor-pointer"
                    />
                </div>
                <div className="flex h-[60vh] flex-col items-end justify-center tracking-wide">
                    {Links.map((link) => (
                        <span key={link.title}>
                            <Link
                                href={link.href}
                                className="text-secondary-color text-[2.5rem] leading-[50px] font-medium uppercase"
                            >
                                {link.title}
                            </Link>
                        </span>
                    ))}
                </div>
            </div>
        </m.nav>
    );
};

const NavbarLaptop = () => {
    return (
        <nav className="hidden gap-6 md:flex">
            {Links.map((link) => (
                <Link key={link.title} href={link.href} className="text-lg">
                    {link.title}
                </Link>
            ))}
        </nav>
    );
};

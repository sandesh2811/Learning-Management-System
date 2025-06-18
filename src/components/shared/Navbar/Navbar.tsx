"use client";

import { useActiveState } from "@/hooks/useActiveState";

import NavbarMobile from "./NavbarMobile";
import NavbarLaptop from "./NavbarLaptop";
import { FiMenu } from "react-icons/fi";

import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/Store";

const Navbar = () => {
    /* Get the active state boolean and methods for altering the state */
    const { isActive, setActiveStateTrue, setActiveStateFalse } =
        useActiveState();

    /* Get the logged in user */
    const loggedInUser = useSelector((state: RootState) => state.loggedinUser);

    return (
        <header className="z-10 mb-16 flex h-[5vh] items-center justify-between">
            {/* LOGO/HEADING */}
            <h1 className="text-lg font-semibold tracking-wide">
                <Link href="/">LEARN NEPAL</Link>
            </h1>

            {/* LOGIN AND MENU BUTTON */}
            <div className="flex items-center gap-4">
                {loggedInUser.role !== "" ? (
                    <FiMenu
                        size={25}
                        onClick={setActiveStateTrue}
                        className="cursor-pointer md:hidden"
                    />
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="text-primary-text font-medium md:hidden"
                        >
                            Login
                        </Link>
                        <FiMenu
                            size={25}
                            onClick={setActiveStateTrue}
                            className="cursor-pointer md:hidden"
                        />
                    </>
                )}
            </div>

            {/* NAVBAR MOBILE */}
            <AnimatePresence mode="wait">
                {!!isActive && (
                    <NavbarMobile
                        key="mobile-navbar"
                        isActive={isActive}
                        setActiveStateFalse={setActiveStateFalse}
                    />
                )}
            </AnimatePresence>

            {/* NAVBAR LAPTOP */}
            <NavbarLaptop />
        </header>
    );
};

export default Navbar;

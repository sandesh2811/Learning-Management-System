"use client";

import { DASHBOARD_LINKS } from "@/constants/Constants";

import { SlideDownVariant } from "@/animation/variants";

import { useActiveState } from "@/hooks/useActiveState";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import { useDetermineScreenSize } from "@/hooks/useDetermineScreenSize";
import { useHandleUserLogoutLogic } from "@/features/auth/hooks/useHandleUserLogoutLogic";

import { NavLink } from "@/components/shared/Navbar/NavbarMobile";

import Link from "next/link";
import { useEffect } from "react";
import { RootState } from "@/store/Store";
import { useSelector } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";
import { AnimatePresence, motion as m } from "motion/react";

const Navbar = () => {
    /* Get the active state */
    const { isActive, setActiveStateTrue, setActiveStateFalse } =
        useActiveState();

    return (
        <header className="border-primary-text/20 flex items-center justify-between border-b-[1.2px] pb-4">
            <h2 className="text-2xl font-semibold tracking-tight uppercase">
                <Link href="/dashboard">Dashboard</Link>
            </h2>

            {/* DASHBOARD NAVBAR FOR LARGER SCREENS */}

            <DashboardNavbarLaptop />

            <FiMenu
                size={25}
                onClick={setActiveStateTrue}
                className="cursor-pointer md:hidden"
            />

            {/* DASHBOARD NAVBAR FOR SMALLER SCREENS */}

            <AnimatePresence mode="wait">
                {!!isActive && (
                    <DashboardNavbarMobile
                        isActive={isActive}
                        setActiveStateFalse={setActiveStateFalse}
                    />
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;

/* DASHBOARD NAVBAR LAPTOP COMPONENT */

const DashboardNavbarLaptop = () => {
    /* Get the handle logout method for logging out user */
    const { handleLogout } = useHandleUserLogoutLogic();

    /* Get the logged in user */
    const loggedInUser = useSelector((state: RootState) => state.loggedinUser);

    return (
        <nav className="hidden items-center gap-4 text-lg font-medium md:flex">
            {DASHBOARD_LINKS.map((link) => {
                if (link.title === "Logout") {
                    return (
                        <span
                            key={link.title}
                            onClick={handleLogout}
                            className="cursor-pointer font-medium"
                        >
                            {link.title}
                        </span>
                    );
                }

                return (
                    <Link
                        key={link.title}
                        href={`${link.href}/${loggedInUser.username}`}
                    >
                        {link.title}
                    </Link>
                );
            })}
        </nav>
    );
};

/* DASHBOARD NAVBAR MOBILE COMPONENT */

interface DashboardNavbarMobileProps {
    isActive: boolean;
    setActiveStateFalse: () => void;
}

const DashboardNavbarMobile = ({
    isActive,
    setActiveStateFalse,
}: DashboardNavbarMobileProps) => {
    const { handleLogout } = useHandleUserLogoutLogic();

    /* Disable scroll if navbar active */
    useDisableScroll(isActive);

    /* Get the logged in user */
    const loggedInUser = useSelector((state: RootState) => state.loggedinUser);

    /* Get the screen size */
    const screenSize = useDetermineScreenSize();

    /* If screen size exceeds 768px then close the active navbar */
    useEffect(() => {
        if (screenSize === "md" || screenSize === "lg") {
            setActiveStateFalse();
        }
    }, [screenSize, setActiveStateFalse]);

    return (
        <m.nav
            variants={SlideDownVariant}
            initial="initial"
            animate="enter"
            exit="exit"
            className="absolute top-0 right-0 z-50 h-screen w-full md:hidden"
        >
            <div className="bg-primary-text text-background flex h-full flex-col p-6">
                <div className="flex justify-end">
                    {/* NAVBAR CLOSE ICON */}
                    <FiX
                        size={25}
                        onClick={setActiveStateFalse}
                        className="mt-2 cursor-pointer"
                    />
                </div>

                {/* DASHBOARD LINKS */}

                <div className="mt-9 flex min-h-[50vh] flex-col items-end justify-center gap-4 tracking-wide">
                    {DASHBOARD_LINKS.map((link) => {
                        if (link.title === "logout") {
                            return (
                                <span
                                    key={link.title}
                                    onClick={handleLogout}
                                    className="text-secondary-color text-[2.5rem] leading-[50px] font-medium uppercase"
                                >
                                    {link.title}
                                </span>
                            );
                        }

                        return (
                            <NavLink
                                key={link.title}
                                title={link.title}
                                href={`${link.href}/${loggedInUser.username}`}
                                setActiveStateFalse={setActiveStateFalse}
                                className="text-[2.2rem]"
                            />
                        );
                    })}
                </div>
            </div>
        </m.nav>
    );
};

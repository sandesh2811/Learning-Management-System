import { Links, USER_BASED_LINKS } from "@/constants/Constants";

import { useDisableScroll } from "@/hooks/useDisableScroll";
import { useDetermineScreenSize } from "@/hooks/useDetermineScreenSize";

import { preventNavigationFromSamePageToSamePage } from "@/utils/preventNavigationFromSamePageToSamePage";

import { SlideDownVariant } from "@/animation/variants";

import Link from "next/link";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { RootState } from "@/store/Store";
import { useSelector } from "react-redux";
import { motion as m } from "motion/react";
import { usePathname } from "next/navigation";
import { useHandleUserLogoutLogic } from "@/features/auth/hooks/useHandleUserLogoutLogic";

interface NavbarMobileProps {
    isActive: boolean;
    setActiveStateFalse: () => void;
}

const NavbarMobile = ({ isActive, setActiveStateFalse }: NavbarMobileProps) => {
    /* Get the handle logout method for logging out user */
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
            className="absolute top-0 right-0 z-50 h-screen w-full"
        >
            <div className="bg-primary-text text-background flex h-full flex-col p-6">
                <div className="flex justify-end">
                    {/* Close button */}
                    <FiX
                        size={25}
                        onClick={setActiveStateFalse}
                        className="mt-2 cursor-pointer"
                    />
                </div>
                <div className="mt-9 flex min-h-[50vh] flex-col items-end justify-center gap-4 tracking-wide">
                    {Links.map((link) => {
                        /* For not showing login link when the navbar is open */
                        if (link.title === "Login") {
                            return;
                        }

                        /* For not showing login and register link when the navbar is open and user is logged in */
                        if (loggedInUser.role !== "") {
                            if (
                                link.title === "Login" ||
                                link.title === "Register"
                            ) {
                                return;
                            }
                        }

                        /*  Non user based links */
                        return (
                            <NavLink
                                key={link.title}
                                title={link.title}
                                href={link.href}
                                setActiveStateFalse={setActiveStateFalse}
                            />
                        );
                    })}

                    {/* If user is logged in then show the user based links */}
                    {loggedInUser.role !== "" && (
                        <>
                            {USER_BASED_LINKS.map((link) => {
                                /* If user's role is student then don't show dashboard */
                                if (loggedInUser.role === "Student") {
                                    if (link.title === "Dashboard") {
                                        return;
                                    }
                                    /* If user's role is teacher then don't show purchased courses */
                                } else if (loggedInUser.role === "Teacher") {
                                    if (link.title === "Purchased Courses") {
                                        return;
                                    }
                                }

                                if (link.title === "Logout") {
                                    return (
                                        <span
                                            onClick={handleLogout}
                                            className="text-secondary-color text-[2.5rem] leading-[50px] font-medium uppercase"
                                            key={link.title}
                                        >
                                            {link.title}
                                        </span>
                                    );
                                }

                                /*  User based links */
                                return (
                                    <NavLink
                                        key={link.title}
                                        title={link.title}
                                        href={`${link.href}/${loggedInUser.username}`}
                                        setActiveStateFalse={
                                            setActiveStateFalse
                                        }
                                    />
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </m.nav>
    );
};

export default NavbarMobile;

interface NavLinkProps {
    title: string;
    href: string;
    setActiveStateFalse: () => void;
}

const NavLink = ({ title, href, setActiveStateFalse }: NavLinkProps) => {
    const pathname = usePathname();

    return (
        <span onClick={setActiveStateFalse} className="text-right">
            <Link
                onClick={preventNavigationFromSamePageToSamePage({
                    href: href,
                    pathname,
                })}
                href={href}
                className="text-secondary-color text-[2.5rem] leading-[50px] font-medium uppercase"
            >
                {title}
            </Link>
        </span>
    );
};

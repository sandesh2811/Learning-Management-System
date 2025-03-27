"use client";

import Link from "next/link";
import { useState } from "react";

import { FiX, FiMenu } from "react-icons/fi";

const Links = [
    {
        href: "/",
        title: "Home",
    },
    {
        href: "/courses",
        title: "Courses",
    },

    {
        href: "/register",
        title: "Register",
    },
    {
        href: "/login",
        title: "Login",
    },
];

const NavbarMobile = () => {
    const [isActive, setActive] = useState<boolean>(true);

    return (
        <>
            <FiMenu
                size={25}
                onClick={() => setActive(true)}
                className="z-30 cursor-pointer"
            />
            <nav className="absolute top-0 right-0 h-screen w-full">
                {isActive && (
                    <div className="bg-primary-text text-background flex h-full flex-col p-6">
                        <div className="flex justify-end">
                            <FiX size={25} onClick={() => setActive(false)} />
                        </div>
                        <div className="flex h-[60vh] flex-col items-end justify-center tracking-wide">
                            {Links.map((link) => (
                                <Link
                                    key={link.title}
                                    href={link.href}
                                    className="text-secondary-color text-[2.5rem] leading-[50px] font-medium uppercase"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default NavbarMobile;

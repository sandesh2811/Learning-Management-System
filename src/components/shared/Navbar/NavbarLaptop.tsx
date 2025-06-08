import { Links } from "@/constants/Constants";

import { preventNavigationFromSamePageToSamePage } from "@/utils/preventNavigationFromSamePageToSamePage";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/Store";
import { GoBell } from "react-icons/go";
import { Span } from "@/components/ui/Span";

import demo from "../../../../public/demo.png";
import Image from "next/image";
import { useActiveState } from "@/hooks/useActiveState";
import Dropdown from "./Dropdown";

const NavbarLaptop = () => {
    const pathname = usePathname();

    const loggedInUser = useSelector((state: RootState) => state.loggedinUser);

    const { isActive, toggleActiveState } = useActiveState();

    return (
        <nav className="relative hidden items-center gap-6 md:flex">
            {Links.map((link) => {
                if (loggedInUser.role !== "") {
                    if (link.title === "Login" || link.title === "Register") {
                        return;
                    }
                }

                return (
                    <Link
                        onClick={preventNavigationFromSamePageToSamePage({
                            href: link.href,
                            pathname,
                        })}
                        key={link.title}
                        href={link.href}
                        className="text-lg"
                    >
                        {link.title}
                    </Link>
                );
            })}

            {loggedInUser.role !== "" && (
                <>
                    <Span
                        onClick={() => console.log("demo notification")}
                        className="bg-secondary-background rounded-full p-2"
                    >
                        <GoBell size={25} />
                    </Span>

                    <span
                        id="user-image"
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

                    <Dropdown isActive={isActive} />
                </>
            )}
        </nav>
    );
};

export default NavbarLaptop;

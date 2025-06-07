import { Links } from "@/constants/Constants";

import { preventNavigationFromSamePageToSamePage } from "@/utils/preventNavigationFromSamePageToSamePage";

import User from "./User";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/Store";

const NavbarLaptop = () => {
    const pathname = usePathname();

    const loggedInUser = useSelector((state: RootState) => state.loggedinUser);

    return (
        <nav className="hidden items-center gap-6 md:flex">
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

            {loggedInUser.role !== "" && <User />}
        </nav>
    );
};

export default NavbarLaptop;

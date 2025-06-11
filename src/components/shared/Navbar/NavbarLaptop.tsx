import { Links } from "@/constants/Constants";

import { preventNavigationFromSamePageToSamePage } from "@/utils/preventNavigationFromSamePageToSamePage";

import UserLinks from "./UserLinks";
import { Span } from "@/components/ui/Span";

import Link from "next/link";
import { GoBell } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "@/store/Store";
import { usePathname } from "next/navigation";

const NavbarLaptop = () => {
    const pathname = usePathname();

    /* Get the logged in user */
    const loggedInUser = useSelector((state: RootState) => state.loggedinUser);

    return (
        <nav className="relative hidden items-center gap-6 md:flex">
            {Links.map((link) => {
                if (loggedInUser.role !== "") {
                    if (link.title === "Login" || link.title === "Register") {
                        return;
                    }
                }

                /* Non user links */
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
                    {/* Notifications button */}
                    <Span
                        onClick={() => console.log("demo notification")}
                        className="bg-secondary-background rounded-full p-2"
                    >
                        <GoBell size={25} />
                    </Span>

                    {/* Dropdown */}
                    <UserLinks />
                </>
            )}
        </nav>
    );
};

export default NavbarLaptop;

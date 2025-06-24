import { Links } from "@/constants/Constants";

import { preventNavigationFromSamePageToSamePage } from "@/utils/preventNavigationFromSamePageToSamePage";

import UserLinks from "./UserLinks";
import NotificationsContainer from "@/features/user/components/notifications/Notifications";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/Store";
import { usePathname } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import { totalCartItems } from "@/store/cart/cartItems";

const NavbarLaptop = () => {
    const pathname = usePathname();

    /* Get the logged in user */
    const loggedInUser = useSelector((state: RootState) => state.loggedinUser);

    /* Get the cart items length */
    const cartItems = useSelector(totalCartItems);

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

            {/* Cart  */}
            <Link
                href="/cart"
                className="bg-secondary-background relative rounded-full p-2.5"
            >
                <FiShoppingCart size={22} />
                {cartItems > 0 && (
                    <span className="text-background absolute top-0 -right-2.5 flex size-5 items-center justify-center rounded-full bg-red-500">
                        {cartItems}
                    </span>
                )}
            </Link>

            {loggedInUser.role !== "" && (
                <>
                    {/* Notifications */}
                    <NotificationsContainer />

                    {/* Dropdown */}
                    <UserLinks />
                </>
            )}
        </nav>
    );
};

export default NavbarLaptop;

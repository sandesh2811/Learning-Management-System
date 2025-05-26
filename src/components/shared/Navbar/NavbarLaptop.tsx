import { Links } from "@/constants/Constants";
import { preventNavigationFromSamePageToSamePage } from "@/utils/preventNavigationFromSamePageToSamePage";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLaptop = () => {
    const pathname = usePathname();

    return (
        <nav className="hidden gap-6 md:flex">
            {Links.map((link) => (
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
            ))}
        </nav>
    );
};

export default NavbarLaptop;

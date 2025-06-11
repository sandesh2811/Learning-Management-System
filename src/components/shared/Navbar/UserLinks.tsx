import demo from "../../../../public/demo.png";

import { USER_BASED_LINKS } from "@/constants/Constants";

import { useHandleUserLogoutLogic } from "@/features/auth/hooks/useHandleUserLogoutLogic";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import Image from "next/image";

import { GoArrowUpRight } from "react-icons/go";
import { useSelector } from "react-redux";

import { RootState } from "@/store/Store";

const UserLinks = () => {
    /* Get the logged in user */
    const loggedInUser = useSelector((state: RootState) => state.loggedinUser);

    /* Get the handle logout method for logging out user */
    const { handleLogout } = useHandleUserLogoutLogic();

    return (
        <DropdownMenu>
            {/* FOR USER IMAGE IN NAVBAR */}
            <DropdownMenuTrigger className="rounded-full">
                <span
                    id="user-image"
                    className="bg-primary-text relative flex size-10 cursor-pointer items-center overflow-hidden rounded-full"
                >
                    <Image
                        src={demo}
                        alt="User"
                        className="object-cover duration-300 ease-in-out group-hover:scale-105"
                        fill
                    />
                </span>
            </DropdownMenuTrigger>

            {/* FOR THE DROPDOWN LINKS */}
            <DropdownMenuContent className="mt-2 flex flex-col gap-2 p-4">
                {USER_BASED_LINKS.map((link) => {
                    /* If user role is student then don't show dashboard */
                    if (loggedInUser.role === "Student") {
                        if (link.title === "Dashboard") {
                            return;
                        }
                    }
                    /* If user role is teacher then don't show purchased courses */
                    if (loggedInUser.role === "Teacher") {
                        if (link.title === "Purchased Courses") {
                            return;
                        }
                    }

                    /* Logout Link */
                    if (link.title === "Logout") {
                        return (
                            <DropdownMenuItem
                                key={link.title}
                                className="text-primary-text group w-full cursor-pointer justify-between gap-8 text-base focus:bg-transparent"
                                onClick={handleLogout}
                            >
                                {link.title}
                                <GoArrowUpRight className="text-primary-text duration-300 ease-in-out group-hover:translate-x-2 group-hover:-translate-y-2 group-focus:translate-x-2 group-focus:-translate-y-2" />
                            </DropdownMenuItem>
                        );
                    }

                    /* Other Links */
                    return (
                        <Link
                            key={link.title}
                            className="group flex w-full cursor-pointer items-center justify-between rounded-sm font-medium"
                            href={`${link.href}/${loggedInUser.username}`}
                            prefetch={true}
                        >
                            <DropdownMenuItem className="text-primary-text group w-full cursor-pointer justify-between gap-8 text-base focus:bg-transparent">
                                {link.title}
                                <GoArrowUpRight className="text-primary-text duration-300 ease-in-out group-hover:translate-x-2 group-hover:-translate-y-2 group-focus:translate-x-2 group-focus:-translate-y-2" />
                            </DropdownMenuItem>
                        </Link>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserLinks;

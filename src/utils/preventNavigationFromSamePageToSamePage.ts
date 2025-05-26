import { MouseEvent } from "react";

interface PreventNavigationFromSamePageToSamePageProps {
    href: string;
    pathname: string;
}

export const preventNavigationFromSamePageToSamePage =
    ({ href, pathname }: PreventNavigationFromSamePageToSamePageProps) =>
    (e: MouseEvent<HTMLAnchorElement>) => {
        if (pathname === href) e.preventDefault();
    };

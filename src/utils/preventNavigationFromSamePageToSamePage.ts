import { MouseEvent } from "react";

interface PreventNavigationFromSamePageToSamePageArgs {
    href: string;
    pathname: string;
}

export const preventNavigationFromSamePageToSamePage =
    ({ href, pathname }: PreventNavigationFromSamePageToSamePageArgs) =>
    (e: MouseEvent<HTMLAnchorElement>) => {
        if (pathname === href) e.preventDefault();
    };

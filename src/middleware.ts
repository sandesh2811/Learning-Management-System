import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
    const access_token = req.cookies.get("access_token")?.value;
    const refresh_token = req.cookies.get("refresh_token")?.value;

    if (!access_token || !refresh_token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
};

export const config = {
    matcher: ["/enrollForm", "/confirmation", "/user/:slug*", "/api/user"],
};

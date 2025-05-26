import "server-only";

import { env } from "./checkEnv";

import { cookies } from "next/headers";

export const SetCookies = async ({
    signedAccessToken,
    signedRefreshToken,
}: {
    signedAccessToken: string;
    signedRefreshToken: string;
}) => {
    // Access token
    (await cookies()).set("access_token", signedAccessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "development" ? false : true,
        sameSite: "strict",
        expires: new Date(
            Date.now() + Number(env.ACCESS_TOKEN_COOKIE_EXPIRY) * 60 * 1000
        ),
    });

    // Refresh token
    (await cookies()).set("refresh_token", signedRefreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "development" ? false : true,
        sameSite: "strict",
        expires: new Date(
            Date.now() +
                Number(env.REFRESH_TOKEN_COOKIE_EXPIRY) * 24 * 60 * 60 * 1000
        ),
        path: "/",
    });
};

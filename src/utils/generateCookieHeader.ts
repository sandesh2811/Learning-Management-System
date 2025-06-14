import { cookies } from "next/headers";

export const generateCookieHeader = async (): Promise<string> => {
    /* Get cookie store */
    const cookieStore = await cookies();

    /* Get all cookies, map them to return array of cookies combined as key and value and join them with a semicolon */
    const cookieHeader = cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");

    return cookieHeader;
};

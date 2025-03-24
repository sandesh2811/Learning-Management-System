import { env } from "@/utils/checkEnv";

import bcrypt from "bcryptjs";

/*
    Get the user password
    Hash the user password to generate hashed password
*/

const HashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, Number(env.SALT_ROUNDS));

    return hashedPassword;
};

/*
    Get both user entered password and saved hashed password respectively
    Compare passwords and return 
 */

const ComparePassword = async ({
    hashedPassword,
    password,
}: {
    hashedPassword: string;
    password: string;
}): Promise<boolean> => {
    const isSamePassword = await bcrypt.compare(password, hashedPassword);

    return isSamePassword;
};

export { HashPassword, ComparePassword };

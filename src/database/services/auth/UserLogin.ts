import "server-only";

import { UserModel, type UserSchemaType } from "@/database/models/UserModel";

const GetUser = async (username: string): Promise<UserSchemaType | null> => {
    const user = await UserModel.findOne({ username });

    if (user) return user;

    return null;
};

export { GetUser };

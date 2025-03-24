import { UserModel } from "@/database/models/UserModel";

const GetUser = async (username: string) => {
    const user = await UserModel.findOne({ username });

    if (user) return user;
};

export { GetUser };

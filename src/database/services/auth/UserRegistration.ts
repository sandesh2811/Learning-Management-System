import { UserModel } from "@/database/models/UserModel";
import { HashPassword } from "@/lib/bcrypt";

const CheckUserExists = async (email?: string): Promise<boolean> => {
    const user = await UserModel.findOne({ email });

    if (user) return true;

    return false;
};

/*
    Hash the user entered password
    Create new user
*/

const CreateUser = async ({
    email,
    username,
    role,
    password,
    fullname,
}: RegisterUserType): Promise<void> => {
    const hashedPassword = await HashPassword(password);

    await UserModel.create({
        username,
        email,
        password: hashedPassword,
        role,
        fullname,
    });
};

export { CheckUserExists, CreateUser };

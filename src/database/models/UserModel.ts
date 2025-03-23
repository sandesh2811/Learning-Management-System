import mongoose, { Document, Model, Schema } from "mongoose";

interface UserSchemaType extends Document {
    username: string;
    email: string;
    password: string;
    // avatar : string,
    role: string;
}

const UserSchema = new Schema<UserSchemaType>(
    {
        username: {
            type: String,
            required: [true, "Username is required!"],
            unique: true,
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required!"],
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required!"],
            minlength: [8, "Password must be 8 characters long!"],
            maxlength: [20, "Password cannot exceed 20 characters!"],
            trim: true,
        },

        // avatar : {
        //     type: String,
        //     required : [true , "Avatar is required!"]
        // },

        role: {
            type: String,
            required: [true, "Role cannot be empty!"],
        },
    },
    { timestamps: true }
);

export const UserModel =
    (mongoose.models.Users as Model<UserSchemaType>) ||
    mongoose.model<UserSchemaType>("User", UserSchema);

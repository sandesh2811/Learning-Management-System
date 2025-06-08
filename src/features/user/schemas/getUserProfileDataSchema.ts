import z from "zod";

export const UserProfileDataSchema = z
    .object({
        _id: z.string(),
        fullname: z.string(),
        username: z.string(),
        avatar: z.string(),
        email: z.string(),
        role: z.string(),
        about: z.string(),
        title: z.string(),
        updatedAt: z.string(),
        address: z.string(),
        contactNumber: z.string(),
    })
    .strict();

export type UserProfileDataType = z.infer<typeof UserProfileDataSchema>;

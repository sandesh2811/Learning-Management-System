import RegisterSchema from "@/validators/auth/RegisterSchema";

import { z } from "zod";

const AddressSchema = z
    .union([
        z
            .string()
            .min(4, { message: "Atleast 4 characters is required!" })
            .max(40, { message: "Atmost 40 characters are allowed!" }),
        z.string().length(0),
    ])
    .optional()
    .transform((val) => (val === "" ? undefined : val));

const ContactNumberSchema = z
    .union([
        z
            .string()
            .min(10, { message: "Atleast 10 characters is required!" })
            .max(10, { message: "Atmost 10 characters are allowed!" }),
        z.string().length(0),
    ])
    .optional()
    .transform((val) => (val === "" ? undefined : val));

const UpdateProfileSchema = RegisterSchema.pick({
    fullname: true,
    username: true,
    email: true,
    // avatar: true,
}).extend({
    title: z
        .string({ message: "Title is required!" })
        .min(5, { message: "Atleast 5 characters is required!" })
        .max(25, { message: "Atmost 25 characters is allowed!" }),

    address: AddressSchema,

    contactNumber: ContactNumberSchema,

    about: z
        .string({ message: "About is required!" })
        .min(5, { message: "Atleast 5 characters is required!" }),
});

export default UpdateProfileSchema;

export type UpdateProfileType = z.infer<typeof UpdateProfileSchema>;

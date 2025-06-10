import RegisterSchema from "@/validators/auth/RegisterSchema";

import { z } from "zod";

const AddressSchema = z.string().optional();

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
    address: AddressSchema.refine(
        (value) => (value !== undefined ? true : false),
        {
            message: "Address is to be passed!",
        }
    ),

    contactNumber: z.string({ message: "Contact number is required!" }),

    about: z
        .string({ message: "About is required!" })
        .min(5, { message: "Atleast 5 characters is required!" }),
});

export default UpdateProfileSchema;

export type UpdateProfileType = z.infer<typeof UpdateProfileSchema>;

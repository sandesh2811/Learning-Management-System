import z from "zod";

const RegisterSchema = z.object({
    username: z
        .string({ required_error: "Username cannot be empty!" })
        .min(3, { message: "Username must be atleast 3 characters!" })
        .max(30, { message: "Username cannot exceed 15 characters!" })
        .trim(),

    password: z
        .string({ required_error: "Password cannot be empty!" })
        .min(8, { message: "Password must be atleast 8 characters!" })
        .max(15, { message: "Password cannot exceed 15 characters!" })
        .trim(),

    fullname: z
        .string({ required_error: "Fullname cannot be empty!" })
        .min(10, { message: "Fullname must be atleast 10 characters!" })
        .max(30, { message: "Fullname cannot exceed 30 characters!" }),

    email: z
        .string({ required_error: "Email cannot be empty!" })
        .email("Please enter a valid email!")
        .trim(),

    role: z.string({ required_error: "Role cannot be empty!" }),

    avatar: z.any().refine(
        (file) => {
            return (
                file &&
                    file[0] instanceof File &&
                    file[0].type === "image/jpeg",
                "image/png"
            );
        },
        { message: "Only jpeg or png images are allowed!" }
    ),
});

export default RegisterSchema;

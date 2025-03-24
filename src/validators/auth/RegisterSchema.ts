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
    email: z
        .string({ required_error: "Email cannot be empty!" })
        .email("Please enter a valid email!")
        .trim(),
    role: z.string({ required_error: "Role cannot be empty!" }),
    // avatar
});

export default RegisterSchema;

import RegisterSchema from "@/validators/auth/RegisterSchema";
import { z } from "zod";

export const EnrollFormSchema = RegisterSchema.pick({
    fullname: true,
    email: true,
}).extend({
    paymentMethod: z.string({ message: "Payment method is required!" }),
});

export type EnrollFormType = z.infer<typeof EnrollFormSchema>;

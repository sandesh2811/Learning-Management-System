import z from "zod";

const DiscountSchema = z.object({
    hasDiscount: z.boolean(),
    discountPercentage: z
        .number()
        .min(0, { message: "Discound cannot be less than 0!" })
        .max(100, { message: "Discount cannot exceed 100!" })
        .default(0),
});

const freebiesSchema = z.object({
    isFreebie: z.boolean(),
    file: z.any().refine(
        (file) => {
            return (
                file && file[0] instanceof File && file[0].type === "video/mp4"
            );
        },
        { message: "Only MP4 video is allowed" }
    ),
});

const CreateCourseSchema = z.object({
    authorId: z.string({ required_error: "Course author id cannot be empty!" }),

    title: z
        .string({ required_error: "Course Title cannot be empty!" })
        .min(10, { message: "Course Title must be atleast 10 characters!" })
        .max(30, { message: "Course Title cannot exceed 15 characters!" }),

    description: z
        .string({ required_error: "Course Description cannot be empty!" })
        .min(30, {
            message: "Course Description must be atleast 30 characters!",
        })
        .max(350, {
            message: "Course Description cannot exceed 350 characters!",
        }),

    price: z
        .number({ required_error: "Course price cannot be empty!" })
        .min(1, { message: "Course price must be atleast 1 character!" })
        .max(100000, { message: "Course price cannot exceed 100000!" }),

    duration: z
        .string({ required_error: "Course duration cannot be empty!" })
        .min(1, { message: "Course duration must be atleast 1 character!" })
        .max(10, { message: "Course duration cannot exceed 10 characters!" })
        .or(z.number({ required_error: "Course duration cannot be empty!" })),

    discount: z.optional(DiscountSchema),

    courseContent: z.optional(z.array(z.string())).default([]),

    freebies: freebiesSchema,

    tags: z.array(
        z
            .string({ required_error: "Tag is required!" })
            .min(1, { message: "Atleast one tag is required!" })
    ),

    languagesAvailable: z.array(z.string()).or(z.string()),

    enrolledStudents: z
        .optional(
            z.array(
                z.string().length(24, {
                    message: "Enrolled student id must be 24 characters!",
                })
            )
        )
        .default([]),
});

export default CreateCourseSchema;

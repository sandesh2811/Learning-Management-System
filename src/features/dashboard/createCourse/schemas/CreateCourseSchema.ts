import z from "zod";

const courseContentSchema = z
    .object({
        isFreebie: z.boolean(),
        file: z.any(),
    })
    .refine(
        (val) => {
            if (val.isFreebie) {
                return (
                    val.file &&
                    val.file[0] instanceof File &&
                    val.file[0].type === "video/mp4"
                );
            }
            return true;
        },
        {
            message: "Only MP4 video is allowed!",
            path: ["file"],
        }
    );

const DiscountSchema = z
    .object({
        hasDiscount: z.boolean(),
        discountPercentage: z.string(),
    })
    .refine(
        (val) => {
            if (val.hasDiscount) {
                return (
                    val.discountPercentage >= "0" &&
                    val.discountPercentage <= "100"
                );
            }
            return true;
        },
        {
            message:
                "Discount percentage must be between 0 and 100 when discount is applied",
            path: ["discountPercentage"],
        }
    );

const CreateCourseSchema = z.object({
    authorId: z.string({ required_error: "Course author id cannot be empty!" }),

    title: z
        .string({ required_error: "Course title cannot be empty!" })
        .min(10, { message: "Course Title must be atleast 10 characters!" })
        .max(30, { message: "Course Title cannot exceed 15 characters!" }),

    description: z
        .string({ required_error: "Course description cannot be empty!" })
        .min(30, {
            message: "Course Description must be atleast 30 characters!",
        })
        .max(350, {
            message: "Course Description cannot exceed 350 characters!",
        }),

    price: z
        .string({ required_error: "Course price cannot be empty!" })
        .min(1, { message: "Course price must be atleast 1 character!" })
        .max(50000, { message: "Course price cannot exceed 50000!" }),

    duration: z
        .string({ required_error: "Course duration cannot be empty!" })
        .min(1, { message: "Course duration must be atleast 1 character!" })
        .max(10, { message: "Course duration cannot exceed 10 characters!" })
        .or(z.number({ required_error: "Course duration cannot be empty!" })),

    discount: DiscountSchema,

    // courseContent: z.optional(z.array(z.string())).default([]),

    courseContent: courseContentSchema,

    // freebies: freebiesSchema,

    tags: z.array(
        z
            .string({ required_error: "Tag is required!" })
            .min(1, { message: "Atleast one tag is required!" })
    ),

    languagesAvailable: z.array(
        z
            .string({ required_error: "Course language is required!" })
            .min(1, { message: "Atleast one language is required!" })
    ),

    // enrolledStudents: z
    //     .optional(
    //         z.array(
    //             z.string().length(24, {
    //                 message: "Enrolled student id must be 24 characters!",
    //             })
    //         )
    //     )
    //     .default([]),

    courseThumbnail: z.any().refine(
        (file) => {
            return (
                file &&
                Array.isArray(file) &&
                file[0] instanceof File &&
                ["image/jpeg", "image/png", "image/jpg"].includes(file[0]?.type)
            );
        },
        { message: "Only JPEG, PNG or JPG image is allowed!" }
    ),
});

export default CreateCourseSchema;

export type CreateCourseSchemaType = z.infer<typeof CreateCourseSchema>;

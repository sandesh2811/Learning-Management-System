import { COURSE_TAGS, LANGUAGES_AVAILABLE } from "@/constants/Constants";

import { type CourseToUpdate } from "../schemas/courseToUpdateSchema";
import {
    type BasicInfoUpdate,
    BasicInfoUpdateSchema,
} from "../schemas/basicInfoUpdateScehma";

import { useHandleForm } from "@/hooks/useHandleForm";

import { updateBasicInfo } from "../api/updateBasicInfo";

import Wrapper from "./FormElementWrapper";
import Button from "@/components/ui/Button";
import { Span } from "@/components/ui/Span";
import FormError from "@/components/ui/FormError";
import FormInput from "@/components/ui/FormInput";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface BasicInfoUpdateProps {
    courseToUpdate: CourseToUpdate;
}

const BasicInfoUpdate = ({ courseToUpdate }: BasicInfoUpdateProps) => {
    /* Setting up react hook form */
    const {
        handleSubmit,
        reset,
        setValue,
        watch,
        register,
        formState: { errors },
    } = useForm<BasicInfoUpdate>({
        resolver: zodResolver(BasicInfoUpdateSchema),
        defaultValues: {
            title: courseToUpdate.title,
            duration: courseToUpdate.duration,
            price: String(courseToUpdate.price),
            discount: {
                hasDiscount: courseToUpdate.discount.hasDiscount,
                discountPercentage: String(
                    courseToUpdate.discount.discountPercentage
                ),
            },
            languagesAvailable: courseToUpdate.languagesAvailable,
            tags: courseToUpdate.tags,
            description: courseToUpdate.description,
        },
    });

    const selectedTags = watch("tags") || [];
    const selectedLanguages = watch("languagesAvailable") || [];
    const discount = watch("discount");

    const toggleTag = (tag: string) => {
        const newTags = selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag];

        setValue("tags", newTags, { shouldDirty: true });
    };

    const toggleLanguages = (language: string) => {
        const newLanguages = selectedLanguages.includes(language)
            ? selectedLanguages.filter((l) => l !== language)
            : [...selectedLanguages, language];

        setValue("languagesAvailable", newLanguages, { shouldDirty: true });
    };

    const toggleDiscount = () => {
        if (discount.hasDiscount === true) {
            setValue("discount.hasDiscount", false, { shouldDirty: true });
            setValue("discount.discountPercentage", "0", { shouldDirty: true });
        } else if (discount.hasDiscount === false) {
            setValue("discount.hasDiscount", true, { shouldDirty: true });
            setValue(
                "discount.discountPercentage",
                String(courseToUpdate.discount.discountPercentage),
                { shouldDirty: true }
            );
        }
    };

    const initialState = {
        success: false,
        message: "",
    };

    const { state, action, isPending } = useHandleForm(
        updateBasicInfo,
        initialState
    );

    return (
        <div className="bg-secondary-background min-h-[75vh] rounded-md p-4">
            <form
                onSubmit={handleSubmit(action)}
                className="bg-background flex h-full flex-col gap-5 rounded-sm p-6"
            >
                <Wrapper>
                    <FormInput
                        id="course-title"
                        type="string"
                        label="Course title"
                        {...register("title")}
                        error={errors.title?.message}
                    />

                    <FormInput
                        id="course-duration"
                        type="string"
                        label="Course duration"
                        {...register("duration")}
                        error={errors.duration?.message}
                    />
                </Wrapper>

                <Wrapper>
                    <FormInput
                        id="course-price"
                        type="string"
                        label="Course price"
                        {...register("price")}
                        error={errors.price?.message}
                    />

                    <div className="flex h-full w-full items-center gap-8">
                        <div className="flex h-full w-full flex-col gap-1">
                            <div className="flex h-full items-center gap-2">
                                <label
                                    htmlFor="course-discount"
                                    className="text-sm font-medium md:text-base"
                                >
                                    Has discount
                                </label>
                                <input
                                    type="checkbox"
                                    id="course-discount"
                                    {...register("discount.hasDiscount")}
                                    onChange={toggleDiscount}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <input
                                    id="discount-percentage"
                                    type="string"
                                    placeholder="Discount percentage"
                                    disabled={!discount.hasDiscount}
                                    className={`border-secondary-text flex-1 rounded-sm border-[1.2px] p-2 text-sm ${!discount.hasDiscount && "cursor-not-allowed"}`}
                                    {...register("discount.discountPercentage")}
                                />

                                {errors.discount?.discountPercentage
                                    ?.message && (
                                    <FormError
                                        error={
                                            errors.discount.discountPercentage
                                                .message
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </Wrapper>

                <div className="flex gap-8">
                    {/* LANGUAGES AVAILABLE */}
                    <div className="flex flex-1 flex-col gap-2">
                        <span className="font-medium">Languages available</span>
                        <div className="flex gap-2">
                            {LANGUAGES_AVAILABLE.map((language) => (
                                <Span
                                    key={language}
                                    onClick={() => toggleLanguages(language)}
                                    className={`${selectedLanguages.includes(language) ? "bg-primary-text text-background" : "bg-secondary-background"} cursor-pointer rounded-xs p-1.5 transition-colors duration-300`}
                                >
                                    {language}
                                </Span>
                            ))}

                            <FormError
                                error={errors.languagesAvailable?.message}
                            />
                        </div>
                    </div>

                    {/* COURSE TAGS */}
                    <div className="flex flex-1 flex-col gap-2">
                        <span className="font-medium">Course Tags</span>
                        <div className="flex flex-wrap gap-2">
                            {COURSE_TAGS.map((tag) => (
                                <Span
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`${selectedTags.includes(tag) ? "bg-primary-text text-background" : "bg-secondary-background"} cursor-pointer rounded-xs p-1.5 transition-colors duration-300`}
                                >
                                    {tag}
                                </Span>
                            ))}

                            <FormError error={errors.tags?.message} />
                        </div>
                    </div>
                </div>

                {/* COURSE DESCRIPTION */}
                <div className="flex flex-col gap-2">
                    <label
                        className="text-sm font-medium md:text-base"
                        htmlFor="course-description"
                    >
                        Course description
                    </label>
                    <textarea
                        id="course-description"
                        rows={5}
                        cols={8}
                        className="border-secondary-text rounded-sm border-[1.2px] p-2"
                        placeholder="Write about your course"
                        {...register("description")}
                    />

                    {errors.description?.message && (
                        <FormError error={errors.description.message} />
                    )}
                </div>

                {/* CTA BUTTONS */}
                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        className={`$ w-[150px] tracking-wider`}
                        variant="skeleton"
                    >
                        Cancel
                    </Button>
                    <Button className={`$ w-[150px] tracking-wider`}>
                        Update
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BasicInfoUpdate;

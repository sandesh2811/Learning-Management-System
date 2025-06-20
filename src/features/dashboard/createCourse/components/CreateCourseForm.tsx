"use client";

import Button from "@/components/ui/Button";
import FileInput from "@/components/ui/FileInput";
import FormInput from "@/components/ui/FormInput";
import { Span } from "@/components/ui/Span";
import { COURSE_TAGS, LANGUAGES_AVAILABLE } from "@/constants/Constants";
import { useSetupRHF } from "@/hooks/useSetupRHF";

import { ReactNode, useState } from "react";
import CreateCourseSchema, {
    CreateCourseSchemaType,
} from "../schemas/CreateCourseSchema";
import { useHandleForm } from "@/hooks/useHandleForm";
import { createdCourse } from "../api/createCourse";
import FormError from "@/components/ui/FormError";

const CreateCourseForm = () => {
    /* Setting up react-hook-form */
    const {
        control,
        handleSubmit,
        reset,
        register,
        formState: { errors },
    } = useSetupRHF<CreateCourseSchemaType>(CreateCourseSchema);

    const initialState = {
        success: false,
        message: "",
    };

    const { state, isPending, action } = useHandleForm<CreateCourseSchemaType>(
        createdCourse,
        initialState
    );

    console.log(errors);

    const [hasDiscount, setDiscount] = useState<boolean>(false);
    const [hasFreebieContent, setFreebieContent] = useState<boolean>(false);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedCourseTags, setSelectedCourseTags] = useState<string[]>([]);

    const handleLanguagesSelect = (language: string) => () => {
        if (selectedLanguages.includes(language)) {
            setSelectedLanguages((prev) =>
                prev.filter((item) => item !== language)
            );
        } else {
            setSelectedLanguages([...selectedLanguages, language]);
        }
    };

    const handleCourseTagsSelect = (tag: string) => () => {
        if (selectedCourseTags.includes(tag)) {
            setSelectedCourseTags((prev) =>
                prev.filter((item) => item !== tag)
            );
        } else {
            setSelectedCourseTags([...selectedCourseTags, tag]);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(action)}
            className="border-primary-text/20 shadow-primary-text/5 flex min-h-[70vh] flex-col justify-between gap-4 rounded-md border-[1.2px] p-8 shadow-xl"
        >
            {/* COURSE TITLE AND DURATION */}
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

            {/* COURSE PRICE AND DISCOUNT */}
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
                                checked={hasDiscount}
                                {...register("discount.hasDiscount")}
                                onChange={() => setDiscount(!hasDiscount)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <input
                                id="discount-percentage"
                                type="string"
                                placeholder="Discount percentage"
                                disabled={!hasDiscount}
                                className={`border-secondary-text flex-1 rounded-sm border-[1.2px] p-2 text-sm ${!hasDiscount && "cursor-not-allowed"}`}
                                {...register("discount.discountPercentage")}
                            />

                            {errors.discount?.discountPercentage?.message && (
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

            {/* COURSE THUMBNAIL AND FREEBIE */}
            <Wrapper>
                <FileInput
                    id="course-thumbnail"
                    control={control}
                    name="courseThumbnail"
                    title="Course thumbnail"
                    success={true}
                    multiple={false}
                />

                <div className="flex h-full w-full flex-col">
                    <div className="flex h-full items-center gap-2">
                        <label
                            htmlFor="course-freebies"
                            className="text-sm font-medium md:text-base"
                        >
                            Has freebies
                        </label>
                        <input
                            id="course-freebies"
                            type="checkbox"
                            checked={hasFreebieContent}
                            {...register("courseContent.isFreebie")}
                            onChange={() =>
                                setFreebieContent(!hasFreebieContent)
                            }
                        />
                    </div>

                    <FileInput
                        name="courseContent.file"
                        control={control}
                        success={false}
                        disabled={!hasFreebieContent}
                        buttonClassName={`${!hasFreebieContent ? "cursor-not-allowed" : "cursor-pointer"}`}
                    />
                </div>
            </Wrapper>

            {/* LANGUAGES AVAILABLE AND COURSE TAGS */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <span className="font-medium">Languages available</span>
                    <div className="flex gap-2">
                        {LANGUAGES_AVAILABLE.map((language) => (
                            <Span
                                key={language}
                                onClick={handleLanguagesSelect(language)}
                                className={`${selectedLanguages.includes(language) ? "bg-primary-text text-background" : "bg-secondary-background"} cursor-pointer rounded-xs p-1.5 transition-colors duration-300`}
                                {...register("languagesAvailable")}
                            >
                                {language}
                            </Span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="font-medium">Course Tags</span>
                    <div className="flex flex-wrap gap-2">
                        {COURSE_TAGS.map((tag) => (
                            <Span
                                key={tag}
                                onClick={handleCourseTagsSelect(tag)}
                                className={`${selectedCourseTags.includes(tag) ? "bg-primary-text text-background" : "bg-secondary-background"} cursor-pointer rounded-xs p-1.5 transition-colors duration-300`}
                                {...register("tags")}
                            >
                                {tag}
                            </Span>
                        ))}
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
                    className={`$ w-[150px] tracking-wider`}
                    variant="skeleton"
                >
                    Cancel
                </Button>
                <Button className={`$ w-[150px] tracking-wider`}>Create</Button>
            </div>
        </form>
    );
};

export default CreateCourseForm;

const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2">
            {children}
        </div>
    );
};

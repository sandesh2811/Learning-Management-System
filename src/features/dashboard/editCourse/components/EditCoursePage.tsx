"use client";

import Button from "@/components/ui/Button";
import FileInput from "@/components/ui/FileInput";
import FormError from "@/components/ui/FormError";
import FormInput from "@/components/ui/FormInput";
import { Span } from "@/components/ui/Span";
import { COURSE_TAGS, LANGUAGES_AVAILABLE } from "@/constants/Constants";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

const EditCoursePage = () => {
    const [activeTab, setActiveTab] = useState<string>("Basic Info");

    return (
        <div>
            <EditCourseHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="mt-4">
                {activeTab === "Basic Info" ? (
                    <BasicInfoUpdate />
                ) : (
                    <CourseContentUpdate />
                )}
            </div>
        </div>
    );
};

export default EditCoursePage;

interface EditCourseHeaderProps {
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<string>>;
}

const EditCourseHeader = ({
    activeTab,
    setActiveTab,
}: EditCourseHeaderProps) => {
    return (
        <div className="bg-secondary-background flex w-full justify-between rounded-sm p-2">
            <Span
                onClick={() => setActiveTab("Basic Info")}
                className={`mid:text-base flex flex-1 items-center justify-center rounded-sm p-1.5 text-sm font-medium transition-colors duration-150 ${activeTab === "Basic Info" ? "bg-background shadow-primary-text/20 shadow-2xl" : "bg-transparent"}`}
            >
                Basic Info
            </Span>

            <Span
                onClick={() => setActiveTab("Course Content")}
                className={`mid:text-base flex flex-1 items-center justify-center rounded-sm p-1.5 text-sm font-medium transition-colors duration-150 ${activeTab === "Course Content" ? "bg-background shadow-primary-text/20 shadow-2xl" : "bg-transparent"}`}
            >
                Course Content
            </Span>
        </div>
    );
};

const BasicInfoUpdate = () => {
    /* Setting up react hook form */
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        trigger,
        register,
        formState: { errors },
    } = useForm();

    const [hasDiscount, setDiscount] = useState<boolean>(false);

    return (
        <div className="bg-secondary-background shadow-primary-text/20 h-[75vh] rounded-md p-4 shadow-2xl">
            <form className="bg-background flex h-full flex-col gap-5 rounded-sm p-6">
                <Wrapper>
                    <FormInput
                        id="course-title"
                        type="string"
                        label="Course title"
                        {...register("title")}
                        // error={errors.title?.message}
                    />

                    <FormInput
                        id="course-duration"
                        type="string"
                        label="Course duration"
                        {...register("duration")}
                        // error={errors.duration?.message}
                    />
                </Wrapper>

                <Wrapper>
                    <FormInput
                        id="course-price"
                        type="string"
                        label="Course price"
                        {...register("price")}
                        // error={errors.title?.message}
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

                                {/* {errors.discount?.discountPercentage?.message && (
                                <FormError
                                    error={
                                        errors.discount.discountPercentage
                                            .message
                                    }
                                />
                            )} */}
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
                                    onClick={() => console.log("hello world")}
                                    // onClick={handleLanguagesSelect(language)}
                                    // className={`${selectedLanguages.includes(language) ? "bg-primary-text text-background" : "bg-secondary-background"} cursor-pointer rounded-xs p-1.5 transition-colors duration-300`}
                                    {...register("languagesAvailable")}
                                >
                                    {language}
                                </Span>
                            ))}
                            {/* 
                            <FormError
                                error={errors.languagesAvailable?.message}
                            /> */}
                        </div>
                    </div>

                    {/* COURSE TAGS */}
                    <div className="flex flex-1 flex-col gap-2">
                        <span className="font-medium">Course Tags</span>
                        <div className="flex flex-wrap gap-2">
                            {COURSE_TAGS.map((tag) => (
                                <Span
                                    key={tag}
                                    onClick={() => console.log("hello world")}
                                    // onClick={handleCourseTagsSelect(tag)}
                                    // className={`${selectedCourseTags.includes(tag) ? "bg-primary-text text-background" : "bg-secondary-background"} cursor-pointer rounded-xs p-1.5 transition-colors duration-300`}
                                >
                                    {tag}
                                </Span>
                            ))}

                            {/* <FormError error={errors.tags?.message} /> */}
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

                    {/* {errors.description?.message && (
                    <FormError error={errors.description.message} />
                )} */}
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

const CourseContentUpdate = () => {
    /* Setting up react hook form */
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        trigger,
        register,
        formState: { errors },
    } = useForm();
    return (
        <div className="bg-secondary-background shadow-primary-text/20 h-[75vh] rounded-md p-4 shadow-2xl">
            <form className="bg-background flex h-full flex-col gap-5 rounded-sm p-6">
                <div>This is for pre selected thumbnail and freebies name</div>

                <Wrapper>
                    <FileInput
                        id="course-thumbnail"
                        name="courseThumbnail"
                        title="Course thumbnail"
                        control={control}
                        multiple={false}
                        success={false}
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
                                // checked={hasFreebieContent}
                                {...register("courseContent.isFreebie")}
                                // onChange={() =>
                                //     setFreebieContent(!hasFreebieContent)
                                // }
                            />
                        </div>

                        <FileInput
                            id="course-freebie-file"
                            name="courseContent.file"
                            multiple={false}
                            control={control}
                            success={false}
                            // disabled={!hasFreebieContent}
                            // buttonClassName={`${!hasFreebieContent ? "cursor-not-allowed" : "cursor-pointer"}`}
                        />
                    </div>
                </Wrapper>

                <FormInput
                    id="course-title"
                    type="string"
                    label="Course title"
                    {...register("title")}
                    // error={errors.title?.message}
                />

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

                    {/* {errors.description?.message && (
                    <FormError error={errors.description.message} />
                )} */}
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

const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2">
            {children}
        </div>
    );
};

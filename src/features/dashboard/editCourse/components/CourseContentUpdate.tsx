import { type CourseToUpdate } from "../schemas/courseToUpdateSchema";

import Wrapper from "./FormElementWrapper";
import Button from "@/components/ui/Button";
import FileInput from "@/components/ui/FileInput";
import FormInput from "@/components/ui/FormInput";

import { useForm } from "react-hook-form";
import { Reorder } from "motion/react";
import { useRef, useState } from "react";

interface CourseContentUpdateProps {
    courseToUpdate: CourseToUpdate;
}

const CourseContentUpdate = ({ courseToUpdate }: CourseContentUpdateProps) => {
    return (
        <div className="bg-secondary-background flex min-h-[55vh] flex-col gap-4 rounded-md p-4">
            <div className="bg-background flex flex-col gap-2 rounded-sm px-6 py-2">
                <h3 className="text-base font-medium md:text-lg">
                    Pre uploaded thumbnail and freebie
                </h3>

                <div className="flex gap-4">
                    <span>Current thumbnail: abc</span>
                    <span>Current freebie file: abc</span>
                </div>
            </div>
            <ChapterCreateForm />
            <CourseStructure />
        </div>
    );
};

export default CourseContentUpdate;

const ChapterCreateForm = () => {
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
        <form className="bg-background flex h-full flex-col gap-5 rounded-sm p-6">
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
                    {/* <div className="flex h-full items-center gap-2">
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
                        </div> */}

                    <FileInput
                        id="course-freebie-file"
                        name="courseContent.file"
                        multiple={false}
                        control={control}
                        success={false}
                        title="Course freebie"
                        // disabled={!hasFreebieContent}
                        // buttonClassName={`${!hasFreebieContent ? "cursor-not-allowed" : "cursor-pointer"}`}
                    />
                </div>
            </Wrapper>

            <Wrapper>
                <FormInput
                    id="chapter-title"
                    type="string"
                    label="Chapter title"
                    {...register("title")}
                    // error={errors.title?.message}
                />

                <FileInput
                    id="chapter-content"
                    name="chapter-content"
                    multiple={false}
                    control={control}
                    success={false}
                    title="Chapter content"
                    // disabled={!hasFreebieContent}
                    // buttonClassName={`${!hasFreebieContent ? "cursor-not-allowed" : "cursor-pointer"}`}
                />
            </Wrapper>

            {/* COURSE DESCRIPTION */}
            <div className="flex flex-col gap-2">
                <label
                    className="text-sm font-medium md:text-base"
                    htmlFor="course-description"
                >
                    Chapter description
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
                    className={`w-[150px] tracking-wider`}
                    variant="skeleton"
                >
                    Cancel
                </Button>
                <Button className={`w-[150px] tracking-wider`}>Update</Button>
            </div>
        </form>
    );
};

const CourseStructure = () => {
    const [chaptersList, setChaptersList] = useState([
        "1: Intro to nest ",
        "1: Intro to ",
        "1: Intro ",
        "1: ",
    ]);

    const parentContainer = useRef<null>(null);

    return (
        <div className="bg-background flex h-full flex-col gap-6 rounded-sm p-6">
            <div ref={parentContainer} className="flex flex-col gap-2">
                <div>
                    <h3 className="text-base font-medium md:text-xl">
                        Overall course structure
                    </h3>
                    <span className="text-primary-text/60 text-sm">
                        Drag the chapter list to reorder them
                    </span>
                </div>

                <Reorder.Group
                    axis="y"
                    as="ul"
                    className="divide-primary-text/20 divide-y-[1.2px]"
                    values={chaptersList}
                    onReorder={setChaptersList}
                >
                    {chaptersList.map((chapter, idx) => (
                        <Reorder.Item
                            as="li"
                            key={idx}
                            value={chapter}
                            className="mid:text-lg py-3 text-base"
                            dragConstraints={parentContainer}
                        >
                            {chapter}
                        </Reorder.Item>
                    ))}
                </Reorder.Group>

                <div className="flex justify-end">
                    <Button className="w-[150px] tracking-wider">Save</Button>
                </div>
            </div>
        </div>
    );
};

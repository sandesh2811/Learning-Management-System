import Button from "@/components/ui/Button";
import FileInput from "@/components/ui/FileInput";
import Wrapper from "./FormElementWrapper";
import { useForm } from "react-hook-form";
import { type CourseToUpdate } from "../schemas/courseToUpdateSchema";
import FormInput from "@/components/ui/FormInput";

interface CourseContentUpdateProps {
    courseToUpdate: CourseToUpdate;
}

const CourseContentUpdate = ({ courseToUpdate }: CourseContentUpdateProps) => {
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

export default CourseContentUpdate;

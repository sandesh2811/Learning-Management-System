import CreateCourseSchema, {
    type CreateCourseSchemaType,
} from "../schemas/CreateCourseSchema";

import { useHandleForm } from "@/hooks/useHandleForm";

import { createdCourse } from "../api/createCourse";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCreateFormLogic = () => {
    const router = useRouter();

    /* Setting up react-hook-form */
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        trigger,
        register,
        formState: { errors },
    } = useForm<CreateCourseSchemaType>({
        resolver: zodResolver(CreateCourseSchema),
        mode: "onChange",
    });

    /* Initial state for useActionState hook */
    const initialState = {
        success: false,
        message: "",
    };

    /* For handling form */
    const { state, isPending, action } = useHandleForm<CreateCourseSchemaType>(
        createdCourse,
        initialState
    );

    const [hasDiscount, setDiscount] = useState<boolean>(false);
    const [hasFreebieContent, setFreebieContent] = useState<boolean>(false);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedCourseTags, setSelectedCourseTags] = useState<string[]>([]);

    /* Handle course languages selection */
    const handleLanguagesSelect = (language: string) => () => {
        const updatedLanguages = selectedLanguages.includes(language)
            ? selectedLanguages.filter((item) => item !== language)
            : [...selectedLanguages, language];

        setSelectedLanguages(updatedLanguages);
        setValue("languagesAvailable", updatedLanguages);
        trigger("languagesAvailable");
    };

    /* Handle course tags selection */
    const handleCourseTagsSelect = (tag: string) => () => {
        const updatedCourseTags = selectedCourseTags.includes(tag)
            ? selectedCourseTags.filter((item) => item !== tag)
            : [...selectedCourseTags, tag];

        setSelectedCourseTags(updatedCourseTags);
        setValue("tags", updatedCourseTags);
        trigger("tags");
    };

    return {
        router,

        control,
        handleSubmit,
        reset,
        errors,
        register,

        state,
        isPending,
        action,

        hasDiscount,
        setDiscount,

        hasFreebieContent,
        setFreebieContent,

        selectedCourseTags,
        selectedLanguages,

        handleCourseTagsSelect,
        handleLanguagesSelect,
    };
};

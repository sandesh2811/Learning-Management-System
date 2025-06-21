import CreateCourseSchema, {
    type CreateCourseSchemaType,
} from "../schemas/CreateCourseSchema";

import { useHandleForm } from "@/hooks/useHandleForm";

import { createdCourse } from "../api/createCourse";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCreateFormLogic = () => {
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

    const initialState = {
        success: false,
        message: "",
    };

    const { state, isPending, action } = useHandleForm<CreateCourseSchemaType>(
        createdCourse,
        initialState
    );

    const [hasDiscount, setDiscount] = useState<boolean>(false);
    const [hasFreebieContent, setFreebieContent] = useState<boolean>(false);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedCourseTags, setSelectedCourseTags] = useState<string[]>([]);

    const handleLanguagesSelect = (language: string) => () => {
        const updatedLanguages = selectedLanguages.includes(language)
            ? selectedLanguages.filter((item) => item !== language)
            : [...selectedLanguages, language];

        setSelectedLanguages(updatedLanguages);
        setValue("languagesAvailable", updatedLanguages);
        trigger("languagesAvailable");
    };

    const handleCourseTagsSelect = (tag: string) => () => {
        const updatedCourseTags = selectedCourseTags.includes(tag)
            ? selectedCourseTags.filter((item) => item !== tag)
            : [...selectedCourseTags, tag];

        setSelectedCourseTags(updatedCourseTags);
        setValue("tags", updatedCourseTags);
        trigger("tags");
    };

    return {
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

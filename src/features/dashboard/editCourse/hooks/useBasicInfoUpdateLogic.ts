import {
    type BasicInfoUpdateType,
    BasicInfoUpdateSchema,
} from "../schemas/basicInfoUpdateScehma";
import { type CourseToUpdate } from "../schemas/courseToUpdateSchema";

import { useHandleForm } from "@/hooks/useHandleForm";

import { updateBasicInfo } from "../api/updateBasicInfo";

import lodash from "lodash";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/store/Store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

type BasicInfoUpdateLogicArgs = {
    courseToUpdate: CourseToUpdate;
};

export const useBasicInfoUpdateLogic = ({
    courseToUpdate,
}: BasicInfoUpdateLogicArgs) => {
    /* For invalidating the user created courses */
    const loggedInUser = useSelector((state: RootState) => state.loggedinUser);

    const router = useRouter();

    /* Initial state for useActionState hook */
    const initialState = {
        success: false,
        message: "",
    };

    /* For disabling the update button if nothing in the form is changed */
    const [valuesChanged, setValuesChanged] = useState<boolean>(false);

    /* For query invalidation */
    const queryClient = useQueryClient();

    /* Default values for RHF */
    const defaultValues = useMemo(
        () => ({
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
        }),
        [courseToUpdate]
    );

    /* Setting up react hook form */
    const {
        handleSubmit,
        setValue,
        watch,
        register,
        formState: { errors },
    } = useForm<BasicInfoUpdateType>({
        resolver: zodResolver(BasicInfoUpdateSchema),
        defaultValues,
    });

    /* Field values to watch and update manually */
    const watchedValues = watch();

    /* Toggling the course tag */

    /*
        Checks if the default form values (watched values) contains the tag which is being passed or not
        If the tag  then it already exists removes it by using the filter
        Else it adds the recieved tag in the form values
    */
    const toggleTag = (tag: string) => {
        const newTags = watchedValues.tags.includes(tag)
            ? watchedValues.tags.filter((t) => t !== tag)
            : [...watchedValues.tags, tag];

        setValue("tags", newTags, { shouldDirty: true });
    };

    /* Toggling the course languages */

    /*
        Checks if the default form values (watched values) contains the language which is being passed or not
        If the lanaguage already exists then it removes it by using the filter
        Else it adds the recieved language in the form values
    */
    const toggleLanguages = (language: string) => {
        const newLanguages = watchedValues.languagesAvailable.includes(language)
            ? watchedValues.languagesAvailable.filter((l) => l !== language)
            : [...watchedValues.languagesAvailable, language];

        setValue("languagesAvailable", newLanguages, { shouldDirty: true });
    };

    /* Toggling the course discount */

    /*
        Checks if the discount is true or false
        If the discount is true then toggle the value to false and set the discount percentage to 0
        Else set the discount to true
    */
    const toggleDiscount = () => {
        if (watchedValues.discount.hasDiscount === true) {
            setValue("discount.hasDiscount", false, { shouldDirty: true });
            setValue("discount.discountPercentage", "0", { shouldDirty: true });
        } else if (watchedValues.discount.hasDiscount === false) {
            setValue("discount.hasDiscount", true, { shouldDirty: true });
            // setValue(
            //     "discount.discountPercentage",
            //     String(courseToUpdate.discount.discountPercentage),
            //     { shouldDirty: true }
            // );
        }
    };

    /* Server action with additional argument for current approach of custom hook*/

    /*
        Initialize a variable to store the updated values
        
        Check if the default value of certain field is equal to the data that is being passed from the form using lodash

        If the values are not equal then populate the value in the variable 

        We return the server action with the additional param as id which is used for api call

        Alternatively we could simplify using the bind function
    */
    const actionWithAdditionalArgs = async (
        _: unknown,
        data: BasicInfoUpdateType
    ) => {
        const updatedFields: Partial<BasicInfoUpdateType> = {};

        (Object.keys(defaultValues) as (keyof typeof defaultValues)[]).forEach(
            (key) => {
                if (!lodash.isEqual(defaultValues[key], data[key])) {
                    updatedFields[key] = data[key];
                }
            }
        );

        return await updateBasicInfo(courseToUpdate._id, updatedFields);
    };

    /* For checking if values are same and disabling the update button */
    useEffect(() => {
        const isSame = !lodash.isEqual(watchedValues, defaultValues);

        setValuesChanged(isSame);
    }, [watchedValues, defaultValues]);

    /* Handle form submit */
    const { state, action, isPending } = useHandleForm(
        actionWithAdditionalArgs,
        initialState
    );

    /* Show toast based on state change and invalidate the cached data */
    useEffect(() => {
        if (state.success) {
            toast.success(state.message);

            /* Invalidate the form data */
            queryClient.invalidateQueries({
                queryKey: ["courseToUpdate", courseToUpdate._id],
            });

            /* Invalidate the user created courses */
            queryClient.invalidateQueries({
                queryKey: ["userCreatedCourses", loggedInUser.username],
            });
        } else if (!state.success && state.message !== "") {
            toast.error(state.message);
        }
    }, [state, courseToUpdate._id, queryClient, loggedInUser.username]);

    return {
        router,

        handleSubmit,
        register,
        errors,

        action,
        isPending,

        watchedValues,
        valuesChanged,

        toggleTag,
        toggleDiscount,
        toggleLanguages,
    };
};

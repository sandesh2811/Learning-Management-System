"use client";

import { useSetupRHF } from "@/hooks/useSetupRHF";
import { useHandleFormSubmit } from "../../hooks/usehandleFormSubmit";

import {
    EnrollFormSchema,
    EnrollFormType,
} from "../../schemas/enrollFormSchema";

import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import FormInput from "@/components/ui/FormInput";
import SelectInput from "@/components/ui/selectInput/SelectInput";

import { RootState } from "@/store/Store";
import { useSelector } from "react-redux";

const EnrollForm = () => {
    /* Get logged in user info */
    const loggedInUser = useSelector((state: RootState) => state.loggedinUser);

    /* Setup react hook form */
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useSetupRHF<EnrollFormType>(EnrollFormSchema);

    /* Handle form submit and redirection */
    const { isRedirecting, handleFormSubmit } = useHandleFormSubmit();

    return (
        <form
            className="flex flex-col justify-between gap-4"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <FormInput
                id="fullname"
                type="string"
                label="Full Name"
                defaultValue={loggedInUser.fullname}
                placeholder="Eg: Hari Bahadur"
                {...register("fullname")}
                error={errors.fullname?.message}
            />

            <FormInput
                id="email"
                type="string"
                label="Email"
                defaultValue={loggedInUser.email}
                placeholder="Eg: hari@123.com"
                {...register("email")}
                error={errors.email?.message}
            />

            <SelectInput
                control={control}
                name="paymentMethod"
                fieldName="Payment Method"
                options={[
                    {
                        label: "eSewa",
                        value: "eSewa",
                    },
                ]}
                wrapperClassName="w-full h-auto md:w-full"
            />

            <Button
                className={`${isRedirecting && "bg-primary-text/80 cursor-not-allowed"}`}
            >
                {isRedirecting ? (
                    <Spinner message="Redirecting to confirmation page" />
                ) : (
                    "Continue"
                )}
            </Button>
        </form>
    );
};

export default EnrollForm;

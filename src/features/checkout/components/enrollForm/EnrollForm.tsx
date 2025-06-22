"use client";

import {
    EnrollFormSchema,
    EnrollFormType,
} from "../../schemas/enrollFormSchema";

import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import SelectInput from "@/components/ui/selectInput/SelectInput";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { RootState } from "@/store/Store";
import { userInfoForEnrollment } from "@/store/enrollForm/userInfoForEnrollment";

const EnrollForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    /* Get logged in user info */
    const loggedInUser = useSelector((state: RootState) => state.loggedinUser);

    /* Setup react hook form */
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EnrollFormType>({
        resolver: zodResolver(EnrollFormSchema),
        mode: "onChange",
    });

    /* Handle form submit and redirection */
    const handleFormSubmit = (data: EnrollFormType) => {
        dispatch(
            userInfoForEnrollment({
                fullname: data.fullname,
                email: data.email,
                paymentMethod: data.paymentMethod,
            })
        );

        router.push("/confirmation");
    };

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

            <Button>Continue</Button>
        </form>
    );
};

export default EnrollForm;

"use client";

import { useSetupRHF } from "@/hooks/useSetupRHF";
import { useHandleForm } from "@/hooks/useHandleForm";

import { RegisterUser } from "../../api/RegisterUser";

import RegisterSchema, { RegisterType } from "@/validators/auth/RegisterSchema";

import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import FormInput from "@/components/ui/FormInput";
import SelectInput from "@/components/ui/selectInput/SelectInput";
import FileInput from "@/components/ui/FileInput";

import { useEffect } from "react";
import { toast } from "sonner";

const initialState: ReturnState = {
    success: false,
    message: "",
};

const FormBody = () => {
    /* Setting up react-hook-form */
    const {
        control,
        handleSubmit,
        reset,
        register,
        formState: { errors },
    } = useSetupRHF<RegisterType>(RegisterSchema);

    /* Handling form submit */
    const { state, action, isPending } = useHandleForm<RegisterType>(
        RegisterUser,
        initialState
    );

    /* Reset the form */
    useEffect(() => {
        if (state.success) {
            toast.success(state.message);
            reset();
        } else if (!state.success && state.message !== "") {
            toast.error(state.message);
        }
    }, [state.success, state.message, reset]);

    return (
        <form onSubmit={handleSubmit(action)} className="flex flex-col gap-4">
            <FormInput
                id="fullname"
                type="string"
                label="Fullname"
                placeholder="Eg: Hari Bahadur"
                {...register("fullname")}
                error={errors.fullname?.message}
            />

            <FormInput
                id="username"
                type="string"
                label="Username"
                placeholder="Eg: iamhari"
                {...register("username")}
                error={errors.username?.message}
            />

            <FormInput
                id="password"
                type="password"
                label="Password"
                placeholder="********"
                hasChild={true}
                {...register("password")}
                error={errors.password?.message}
            />

            <FormInput
                id="email"
                type="email"
                label="Email"
                placeholder="Eg: hari@123.com"
                {...register("email")}
                error={errors.email?.message}
            />

            {/* File And Select Input */}
            <div className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 md:flex-row">
                <FileInput
                    id="avatar"
                    name="avatar"
                    title="Profile Picture"
                    control={control}
                    success={state.success}
                    multiple={false}
                />

                <SelectInput
                    fieldName="Role"
                    name="role"
                    control={control}
                    success={state.success}
                    options={[
                        {
                            label: "Teacher",
                            value: "Teacher",
                        },
                        {
                            label: "Student",
                            value: "Student",
                        },
                    ]}
                />
            </div>

            <Button
                disabled={isPending}
                className={`tracking-wider uppercase ${isPending && "bg-primary-text/80 cursor-not-allowed"}`}
            >
                {isPending ? <Spinner message="Registering..." /> : "Register"}
            </Button>
        </form>
    );
};

export default FormBody;

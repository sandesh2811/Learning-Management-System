"use client";

import { useSetupRHF } from "@/hooks/useSetupRHF";
import { useHandleForm } from "@/hooks/useHandleForm";
import { LoginUser } from "../../api/LoginUser";

import LoginSchema, { LoginType } from "@/validators/auth/LoginSchema";

import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import Spinner from "@/components/ui/Spinner";

import { useEffect } from "react";

const FormBody = () => {
    const initialState: ReturnState = {
        success: false,
        message: "",
    };

    /* Setting up react-hook-form */
    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
    } = useSetupRHF<LoginType>(LoginSchema);

    /* Handling form submit */
    const { state, action, isPending } = useHandleForm<LoginType>(
        LoginUser,
        initialState
    );

    /* Reset the form */
    useEffect(() => {
        if (state.success) {
            reset();
        }
    }, [state.success, reset]);

    return (
        <form
            data-testid="form-body"
            onSubmit={handleSubmit(action)}
            className="flex flex-col gap-4"
        >
            <FormInput
                id="username"
                type="string"
                label="Username"
                placeholder="Eg: hari123"
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

            <Button
                disabled={isPending}
                className={`tracking-wider uppercase ${isPending && "cursor-not-allowed"}`}
            >
                {isPending ? <Spinner message="Logging in..." /> : "Login"}
            </Button>
        </form>
    );
};

export default FormBody;

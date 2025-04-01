"use client";

import { useSetupRHF } from "../hooks/useSetupRHF";

import LoginSchema from "@/validators/auth/LoginSchema";

import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";

import React from "react";

const FormBody = () => {
    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
    } = useSetupRHF(LoginSchema);

    return (
        <form className="flex flex-col gap-4 shadow-xl">
            <FormInput
                type="string"
                label="Username"
                placeholder="Eg: Hari Bahadur"
                {...register("username")}
                error={errors.username?.message}
            />
            <FormInput
                type="password"
                label="Password"
                placeholder="********"
                {...register("password")}
                error={errors.password?.message}
            />
            <Button className="p-3 tracking-wider uppercase">Login</Button>
        </form>
    );
};

export default FormBody;

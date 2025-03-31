"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import React from "react";
import { useSetupRHF } from "../hooks/useSetupRHF";
import LoginSchema from "@/validators/auth/LoginSchema";

const FormBody = () => {
    const { control, handleSubmit, reset } = useSetupRHF({
        schema: LoginSchema,
    });

    return (
        <form className="flex flex-col gap-4 shadow-xl">
            <Input
                name="Username"
                control={control}
                type="string"
                label="Username"
                placeholder="Eg: Hari Bahadur"
            />
            <Input
                name="password"
                control={control}
                type="password"
                label="Password"
                placeholder="********"
            />
            <Button className="p-3 tracking-wider uppercase">Login</Button>
        </form>
    );
};

export default FormBody;

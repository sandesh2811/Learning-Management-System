"use client";

import { useSetupRHF } from "@/hooks/useSetupRHF";
import { useHandleForm } from "@/hooks/useHandleForm";

import { LoginUser } from "../../api/LoginUser";

import LoginSchema, { type LoginType } from "@/validators/auth/LoginSchema";

import { loggerInUserInfo } from "@/store/user/loggedInUserInfo";

import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import Spinner from "@/components/ui/Spinner";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

/* Initial State */
const initialState: ReturnState = {
    success: false,
    message: "",
};

const FormBody = () => {
    /* To dispatch action */
    const dispatch = useDispatch();

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

    /*Dispatch the user login data and Reset the form */
    useEffect(() => {
        if (state.success && state.userInfo) {
            dispatch(loggerInUserInfo(state.userInfo));
            reset();
        }
    }, [state.success, state.userInfo, reset, dispatch]);

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

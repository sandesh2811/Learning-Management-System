"use client";

import useDisableScroll from "@/hooks/useDisableScroll";

import { useEffect, useState } from "react";
import FormHeader from "./FormHeader";
import FormBody from "./Form";

const LoginModal = () => {
    const [isActive, setActive] = useState<boolean>(false);

    useEffect(() => {
        setActive(true);
    }, []);

    useDisableScroll(isActive);

    return (
        <div className="absolute top-0 left-0 flex h-screen w-full items-center justify-center bg-gray-500/50 backdrop-blur-sm">
            <div className="bg-background text-primary-text flex min-h-[40vh] max-w-[550px] flex-col gap-6 rounded-md p-6">
                <FormHeader
                    title="Welcome back!"
                    description="Please enter your username and password to login to your account"
                />
                <FormBody />
            </div>
        </div>
    );
};

export default LoginModal;

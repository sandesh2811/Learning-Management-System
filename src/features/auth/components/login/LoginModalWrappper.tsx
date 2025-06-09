"use client";

import dynamic from "next/dynamic";

const LoginModal = dynamic(
    () => import("@/features/auth/components/login/LoginModal"),
    {
        ssr: false,
    }
);

const LoginModalWrappper = () => {
    return <LoginModal />;
};

export default LoginModalWrappper;

"use client";

import { LoginModalVariant } from "../../animation/variants";

import { useLoginModalLogic } from "../../hooks/useLoginModalLogic";

import { handleKeyDown } from "@/utils/handleKeyDown";

import FormHeader from "../FormHeader";
import FormBody from "./Form";

import { GoX } from "react-icons/go";
import { motion as m } from "motion/react";
import { createPortal } from "react-dom";

const LoginModal = () => {
    const { handleModalClose } = useLoginModalLogic();

    return createPortal(
        <div
            id="login-modal"
            role="modal"
            aria-modal="true"
            className="absolute top-0 left-0 flex h-screen w-full items-center justify-center bg-gray-500/50 backdrop-blur-sm"
        >
            <m.div
                variants={LoginModalVariant}
                initial="initial"
                animate="animate"
                className="bg-background text-primary-text flex min-h-[40vh] max-w-[550px] flex-col gap-6 rounded-md p-6"
            >
                <div className="flex justify-between">
                    <FormHeader
                        title="Welcome back!"
                        description="Please enter your username and password to login to your account"
                    />

                    {/* MODAL CLOSE ICON */}
                    <div
                        tabIndex={0}
                        aria-label="Close modal"
                        className="inline-flex h-min"
                        onClick={handleModalClose}
                        onKeyDown={handleKeyDown(handleModalClose)}
                    >
                        <GoX
                            data-testid="close"
                            size={25}
                            className="cursor-pointer"
                        />
                    </div>
                </div>
                <FormBody />
            </m.div>
        </div>,
        document.body
    );
};

export default LoginModal;

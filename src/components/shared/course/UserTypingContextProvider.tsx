"use client";

import UserTyping from "@/features/allcourses/context/UserTyping";

import { ReactNode } from "react";

const UserTypingContextProvider = ({ children }: { children: ReactNode }) => {
    return <UserTyping>{children}</UserTyping>;
};

export default UserTypingContextProvider;

"use client";

import { ReactNode } from "react";
import { GlobalStore } from "@/store/Store";
import { Provider } from "react-redux";

export const StoreProvider = ({
    children,
}: {
    children: Readonly<ReactNode>;
}) => {
    return <Provider store={GlobalStore}>{children}</Provider>;
};

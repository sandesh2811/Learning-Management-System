"use client";

import { getQueryClient } from "@/lib/getQueryClient";

import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
    const client = getQueryClient();

    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
};

export default ReactQueryProvider;

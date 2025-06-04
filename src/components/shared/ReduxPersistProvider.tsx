"use client";

import { GlobalStore } from "@/store/Store";

import { ReactNode } from "react";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const ReduxPersistProvider = ({ children }: { children: ReactNode }) => {
    const persistor = persistStore(GlobalStore);

    return (
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    );
};

export default ReduxPersistProvider;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { SetLoggedInUser } from "./user/loggedInUserInfo";
import { SetUserInfoForEnrollment } from "./enrollForm/userInfoForEnrollment";
import { SetSelectedCourse } from "./selectedCourse/selectedCourse";

const persistConfig = {
    key: "root",
    storage,
};

const combinedReducers = combineReducers({
    loggedinUser: SetLoggedInUser,
    userInfoForEnrollment: SetUserInfoForEnrollment,
    selectedCourse: SetSelectedCourse,
});

const rootReducer = persistReducer(persistConfig, combinedReducers);

export const GlobalStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export type RootState = ReturnType<typeof GlobalStore.getState>;

export type AppDispatch = typeof GlobalStore.dispatch;

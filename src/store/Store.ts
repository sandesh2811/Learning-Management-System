import { configureStore } from "@reduxjs/toolkit";

import { SetLoggedInUser } from "./user/loggedInUserInfo";
import { SetUserInfoForEnrollment } from "./enrollForm/userInfoForEnrollment";
import { SetSelectedCourse } from "./selectedCourse/selectedCourse";

export const GlobalStore = configureStore({
    reducer: {
        loggedinUser: SetLoggedInUser,
        userInfoForEnrollment: SetUserInfoForEnrollment,
        selectedCourse: SetSelectedCourse,
    },
});

export type RootState = ReturnType<typeof GlobalStore.getState>;

export type AppDispatch = typeof GlobalStore.dispatch;

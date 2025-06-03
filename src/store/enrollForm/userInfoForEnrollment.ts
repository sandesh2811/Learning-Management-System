import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserInfoForEnrollmentType = {
    fullname: string;
    email: string;
    paymentMethod: string;
};

const initialState: UserInfoForEnrollmentType = {
    fullname: "",
    email: "",
    paymentMethod: "",
};

const UserInfoForEnrollment = createSlice({
    name: "enroll-user",
    initialState,
    reducers: {
        userInfoForEnrollment: (
            state,
            action: PayloadAction<UserInfoForEnrollmentType>
        ) => {
            const { fullname, email, paymentMethod } = action.payload;

            state.fullname = fullname;
            state.email = email;
            state.paymentMethod = paymentMethod;
        },
    },
});

export const SetUserInfoForEnrollment = UserInfoForEnrollment.reducer;

export const { userInfoForEnrollment } = UserInfoForEnrollment.actions;

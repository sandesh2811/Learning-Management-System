import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoggedInUserType = {
    fullname: string;
    username: string;
    email: string;
    role: string;
};

const initialState: LoggedInUserType = {
    fullname: "",
    username: "",
    email: "",
    role: "",
};

const LoggedInUser = createSlice({
    name: "loggedIn-user",
    initialState,
    reducers: {
        loggerInUserInfo: (state, action: PayloadAction<LoggedInUserType>) => {
            const { fullname, username, email, role } = action.payload;

            state.fullname = fullname;
            state.username = username;
            state.email = email;
            state.role = role;
        },
    },
});

export const SetLoggedInUser = LoggedInUser.reducer;

export const { loggerInUserInfo } = LoggedInUser.actions;

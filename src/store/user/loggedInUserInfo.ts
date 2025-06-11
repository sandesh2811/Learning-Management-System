import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoggedInUserType = {
    userId: string;
    fullname: string;
    username: string;
    email: string;
    role: string;
};

export const loggedInUserInitialState: LoggedInUserType = {
    userId: "",
    fullname: "",
    username: "",
    email: "",
    role: "",
};

const LoggedInUser = createSlice({
    name: "loggedIn-user",
    initialState: loggedInUserInitialState,
    reducers: {
        loggedInUserInfo: (state, action: PayloadAction<LoggedInUserType>) => {
            const { userId, fullname, username, email, role } = action.payload;

            state.userId = userId;
            state.fullname = fullname;
            state.username = username;
            state.email = email;
            state.role = role;
        },
    },
});

export const SetLoggedInUser = LoggedInUser.reducer;

export const { loggedInUserInfo } = LoggedInUser.actions;

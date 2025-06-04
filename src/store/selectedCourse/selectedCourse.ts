import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SelectedCourseType = {
    id: string;
    title: string;
    price: string | number;
    duration: string;
    instructorName: string;
};

const initialState: SelectedCourseType = {
    id: "",
    title: "",
    price: "",
    duration: "",
    instructorName: "",
};

const SelectedCourse = createSlice({
    name: "selected-course",
    initialState,
    reducers: {
        selectedCourse: (state, action: PayloadAction<SelectedCourseType>) => {
            const { id, title, price, duration, instructorName } =
                action.payload;

            state.id = id;
            state.title = title;
            state.price = price;
            state.duration = duration;
            state.instructorName = instructorName;
        },
    },
});

export const SetSelectedCourse = SelectedCourse.reducer;

export const { selectedCourse } = SelectedCourse.actions;

"use client";

import { selectedCourse } from "@/store/selectedCourse/selectedCourse";
import { SingleCourseType } from "../schemas/singleCourse";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

interface SingleCourseDetailsDispatcherProps {
    singleCourse: SingleCourseType;
}

const SingleCourseDetailsDispatcher = ({
    singleCourse,
}: SingleCourseDetailsDispatcherProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (singleCourse) {
            const { title, price, instructorInfo, duration } = singleCourse;

            dispatch(
                selectedCourse({
                    title,
                    price,
                    duration,
                    instructorName: instructorInfo.fullname,
                })
            );
        }
    }, [singleCourse, dispatch]);

    return null;
};

export default SingleCourseDetailsDispatcher;

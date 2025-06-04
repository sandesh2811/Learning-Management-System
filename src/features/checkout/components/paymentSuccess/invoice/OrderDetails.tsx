"use client";

import { RootState } from "@/store/Store";
import { useSelector } from "react-redux";

const CourseDetailHeadings = ["Course Name", "Instructor", "Price"];

const OrderDetails = () => {
    const selectedCourse = useSelector(
        (state: RootState) => state.selectedCourse
    );

    return (
        <div className="flex flex-1/3 flex-col gap-4">
            <div className="border-primary-text/30 flex items-center justify-between gap-2 border-b-[1.2px] pb-2">
                {CourseDetailHeadings.map((detail) => (
                    <h4
                        key={detail}
                        className={`mid:text-base flex-1 ${detail === "Course Name" ? "text-start" : "text-center"} text-[15px] font-semibold`}
                    >
                        {detail}
                    </h4>
                ))}
            </div>
            <div className="flex h-full items-center justify-center gap-2 pb-4">
                <span className="mid:text-base h-full flex-1 text-[15px]">
                    {selectedCourse.title}
                </span>
                <span className="mid:text-base h-full flex-1 text-center text-[15px]">
                    {selectedCourse.instructorName}
                </span>

                <div className="flex h-full flex-1 flex-col justify-between text-center">
                    <span className="mid:text-base text-[15px]">
                        {selectedCourse.price}
                    </span>

                    <span className="mid:text-base text-[15px]">
                        Total: <b>Rs {selectedCourse.price}</b>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;

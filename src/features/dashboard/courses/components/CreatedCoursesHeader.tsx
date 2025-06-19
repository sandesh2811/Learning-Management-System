"use client";

import Button from "@/components/ui/Button";

const CreatedCourseHeader = () => {
    return (
        <div className="flex justify-between">
            <h3 className="mid:text-2xl text-lg font-semibold">Your Courses</h3>
            <Button className="mid:text-base text-xs">Create Course</Button>
        </div>
    );
};

export default CreatedCourseHeader;

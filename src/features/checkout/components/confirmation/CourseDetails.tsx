import { RootState } from "@/store/Store";
import { useSelector } from "react-redux";

const CourseDetails = () => {
    const selectedCourse = useSelector(
        (state: RootState) => state.selectedCourse
    );

    return (
        <div className="flex flex-col gap-1">
            <h4 className="text-lg font-semibold">Course Details</h4>
            <div className="flex flex-col gap-2">
                <span>Course Name: {selectedCourse.title}</span>
                <span>Price: Rs {selectedCourse.price}</span>
                <span>Duration: {selectedCourse.duration}</span>
                <span>Instructor: {selectedCourse.instructorName}</span>
            </div>
        </div>
    );
};

export default CourseDetails;

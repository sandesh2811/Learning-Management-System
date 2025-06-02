import EnrollNowButton from "./EnrollNowButton";
import SectionMainHeading from "../SectionMainHeading";

interface ReasonsToBuyTheCourseProps {
    studentsEnrolled: string[];
}

const ReasonsToBuyTheCourse = ({
    studentsEnrolled,
}: ReasonsToBuyTheCourseProps) => {
    return (
        <div className="bg-secondary-background flex flex-1 flex-col gap-4 rounded-xl p-6">
            <SectionMainHeading title="Why buy this course?" />
            <ul className="ml-5 flex list-disc flex-col gap-2">
                <li>
                    {studentsEnrolled.length === 0
                        ? 0
                        : studentsEnrolled.length}{" "}
                    students enrolled
                </li>
                <li>Chat support for guidence</li>
                <li>Available in multiple languages</li>
                <li>All best practices of industry covered</li>
            </ul>
            <EnrollNowButton />
        </div>
    );
};

export default ReasonsToBuyTheCourse;

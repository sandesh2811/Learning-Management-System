import Button from "@/components/ui/Button";
import { GoArrowUpRight } from "react-icons/go";
import SectionMainHeading from "./SectionMainHeading";

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

const EnrollNowButton = () => {
    return (
        <div className="mid:justify-end flex">
            <Button className="mid:w-[150px] group w-full font-semibold">
                Enroll Now
                <GoArrowUpRight
                    size={22}
                    className="duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
                />
            </Button>
        </div>
    );
};

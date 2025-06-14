import { TABLE_HEADINGS } from "@/constants/Constants";

import { UserEnrolledCourseDataType } from "../../schemas/getUserEnrolledCourseDataSchema";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { GoArrowUpRight } from "react-icons/go";

interface CourseListTableProps {
    userEnrolledCoursesData: UserEnrolledCourseDataType[];
}

const CourseListTable = ({ userEnrolledCoursesData }: CourseListTableProps) => {
    return (
        <Table className="hidden md:table">
            <TableHeader>
                <TableRow>
                    {TABLE_HEADINGS.map((heading) => (
                        <TableHead className="py-5 text-lg" key={heading}>
                            {heading}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {userEnrolledCoursesData.map((userEnrolledcourse) => (
                    <TableRow
                        tabIndex={0}
                        key={userEnrolledcourse.course._id}
                        className="group cursor-pointer text-base"
                    >
                        <TableCell className="font-medium">
                            {userEnrolledcourse.course.title}
                        </TableCell>
                        <TableCell>
                            {new Date(
                                userEnrolledcourse.createdAt
                            ).toDateString()}
                        </TableCell>
                        <TableCell>Progress</TableCell>
                        <TableCell className="flex items-center gap-2 p-5 text-right">
                            View
                            <span className="duration-300 ease-in-out group-hover:translate-x-2 group-hover:-translate-y-2 group-focus:translate-x-2 group-focus:-translate-y-2">
                                <GoArrowUpRight size={20} />
                            </span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CourseListTable;

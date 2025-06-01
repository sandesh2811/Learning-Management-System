import { ReactNode } from "react";
import { GoArrowUpRight } from "react-icons/go";

interface CourseInstructorInfoProps {
    courseInstructorInfo?: unknown;
}

const CourseInstructorInfo = ({
    courseInstructorInfo,
}: CourseInstructorInfoProps) => {
    return (
        <div className="bg-secondary-background flex min-h-[50vh] flex-1 flex-col gap-6 rounded-xl p-6">
            <div className="flex flex-col gap-4">
                <InstructorBasicInfo
                    instructorName="Hari bahadur"
                    instructorEmail="test@test.com"
                />
                <div className="flex flex-col gap-8">
                    <AboutMeSection
                        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
                laudantium dicta ratione ipsam reprehenderit."
                    />
                    <RelatedCoursesSection courses="test" />
                </div>
            </div>
        </div>
    );
};

export default CourseInstructorInfo;

/* SUB HEADING COMPONENT */

interface SectionSubHeadingProps {
    children: ReactNode;
}

const SectionSubHeading = ({ children }: SectionSubHeadingProps) => {
    return <h4 className="text-lg font-semibold">{children}</h4>;
};

/* RELATED COURSES COMPONENT */

interface RelatedCoursesSectionProps {
    courses: unknown;
}

const RelatedCoursesSection = ({}: RelatedCoursesSectionProps) => {
    return (
        <div className="flex flex-col">
            <SectionSubHeading>Related Courses</SectionSubHeading>

            <div className="divide-primary-text flex flex-col gap-2 divide-y-[1.2px]">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <span
                        key={idx}
                        className="group flex cursor-pointer items-center justify-between py-4"
                    >
                        Frontend with React
                        <GoArrowUpRight
                            size={22}
                            className="duration-300 ease-in-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:translate-z-2"
                        />
                    </span>
                ))}
            </div>
        </div>
    );
};

/* ABOUT ME  COMPONENT */

interface AboutMeSectionProps {
    description: string;
}

const AboutMeSection = ({ description }: AboutMeSectionProps) => {
    return (
        <div>
            <SectionSubHeading>About me</SectionSubHeading>
            <p className="mid:text-base text-sm md:text-sm lg:text-base">
                {description}
            </p>
        </div>
    );
};

/* INSTRUCTOR BASIC INFORMATION COMPONENT */

interface InstructorBasicInfoProps {
    instructorName: string;
    instructorEmail: string;
    instructorImage?: unknown;
}

const InstructorBasicInfo = ({
    instructorName,
    instructorEmail,
    instructorImage,
}: InstructorBasicInfoProps) => {
    return (
        <div className="flex items-center gap-4">
            <div className="bg-primary-text size-15 rounded-full"></div>
            <div className="flex flex-col">
                <span>{instructorName}</span>
                <span>{instructorEmail}</span>
            </div>
        </div>
    );
};

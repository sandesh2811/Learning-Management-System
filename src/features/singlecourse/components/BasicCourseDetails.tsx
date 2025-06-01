import { GoStarFill } from "react-icons/go";
import { SingleCourseType } from "../schemas/singleCourse";
import SectionMainHeading from "./SectionMainHeading";
import { ReactNode } from "react";

interface BasicCourseDetailsProps {
    course: SingleCourseType;
}

const BasicCourseDetails = ({ course }: BasicCourseDetailsProps) => {
    return (
        <div className="bg-secondary-background flex min-h-[30vh] flex-1/5 flex-col justify-between gap-8 rounded-xl p-6">
            <div className="flex flex-col gap-1">
                <SectionMainHeading title={course.title} />
                <p className="text-primary-text/85">{course.description}</p>
            </div>

            <div className="flex flex-col gap-2">
                <PriceAndRatingSection
                    price={course.price}
                    rating={course.rating}
                />

                <LanguagesAvailableAndDuration
                    languagesAvailable={course.languagesAvailable}
                    duration={course.duration}
                />
            </div>
        </div>
    );
};

export default BasicCourseDetails;

/* WRAPPER COMPONENT */

interface WrapperProps {
    children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
    return <div className="flex items-center justify-between">{children}</div>;
};

/* PRICE AND RATING COMPONENT */

interface PriceAndRatingSectionProps {
    price: number;
    rating: number;
}

const PriceAndRatingSection = ({
    price,
    rating,
}: PriceAndRatingSectionProps) => {
    return (
        <Wrapper>
            <span>
                Price: <b>Rs {price}</b>
            </span>
            <span className="flex items-center gap-1">
                Rating:
                <span className="flex items-center justify-center gap-1">
                    {rating}
                    <GoStarFill className="text-yellow-500" />
                </span>
            </span>
        </Wrapper>
    );
};

/* LANGUAGES AND DURATION COMPONENT */

interface LanguagesAvailableAndDurationProps {
    languagesAvailable: string[];
    duration: string;
}

const LanguagesAvailableAndDuration = ({
    languagesAvailable,
    duration,
}: LanguagesAvailableAndDurationProps) => {
    return (
        <Wrapper>
            <span className="flex items-center gap-1">
                Languages Available :
                {languagesAvailable.map((lang) => (
                    <span key={lang}>{lang}</span>
                ))}
            </span>
            <span>Duration : {duration}</span>
        </Wrapper>
    );
};

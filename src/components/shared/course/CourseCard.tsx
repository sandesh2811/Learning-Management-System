import { CourseType } from "@/features/allcourses/schemas/incomingCourseSchema";

import Card from "@/components/ui/Card";

import Link from "next/link";

interface CourseCardProps {
    course: CourseType;
}

const CourseCard = ({ course }: CourseCardProps) => {
    const { _id, title, price, tags, coverImage, rating, courseswithuserinfo } =
        course;

    return (
        <Link
            href={`/courses/${_id}`}
            className="focus-visible:rounded-xl focus-visible:outline-[1.2px]"
        >
            <Card
                title={title}
                price={price}
                type={tags[0]}
                image={coverImage}
                rating={rating}
                authorName={courseswithuserinfo.fullname}
                aria-label="Course Card"
                aria-description={`${title} priced at Rs:${price} with a rating of ${rating} stars instructed by Hari Bahadur`}
            />
        </Link>
    );
};

export default CourseCard;

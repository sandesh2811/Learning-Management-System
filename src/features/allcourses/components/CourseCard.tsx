import { CourseType } from "../schemas/incomingCourseSchema";

import Card from "@/components/ui/Card";

import Link from "next/link";

const CourseCard = ({ course }: { course: CourseType }) => {
    const { _id, title, price, tags, coverImage, rating } = course;

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
                authorName="Hari Bahadur"
                aria-label="Course Card"
                aria-description={`${title} priced at Rs:${price} with a rating of ${rating} stars instructed by Hari Bahadur`}
            />
        </Link>
    );
};

export default CourseCard;

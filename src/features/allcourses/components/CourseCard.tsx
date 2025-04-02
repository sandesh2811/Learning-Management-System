import Card from "@/components/ui/Card";
import { CourseType } from "../schemas/incomingCourseSchema";

const CourseCard = ({ course }: { course: CourseType }) => {
    const { title, description, price, tags, coverImage } = course;

    return (
        <Card
            size="shop"
            title={title}
            description={description}
            price={price}
            type={tags[0]}
            image={coverImage}
            authorName="Hari Bahadur"
        />
    );
};

export default CourseCard;

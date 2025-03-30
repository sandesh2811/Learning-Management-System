import Card from "@/components/ui/Card";
import { CourseType } from "@/features/allcourses/schemas/incomingCourseSchema";

type FeaturedCourseProps = {
    course: CourseType;
};

const FeaturedCourseCard = ({ course }: FeaturedCourseProps) => {
    return (
        <Card
            authorName="Hari Bahadur"
            description={course.description}
            price={course.price}
            title={course.title}
            type={course.tags[0]}
            image=""
        />
    );
};

export default FeaturedCourseCard;

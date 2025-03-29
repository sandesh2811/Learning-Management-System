import Card from "@/components/ui/Card";

type FeaturedCourseProps = {
    data: unknown;
};

const FeaturedCourseCard = ({}: FeaturedCourseProps) => {
    return (
        <Card
            authorName="Hari Bahadur"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing
elit. Molestiae assumenda nobis, magni quod porro
veritatis ratione doloribus sapiente deleniti."
            price="50"
            title="Advanced React Course"
            type="Frontend"
            image=""
        />
    );
};

export default FeaturedCourseCard;

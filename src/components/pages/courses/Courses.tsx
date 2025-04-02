import CoursesWrapper from "@/features/allcourses/components/CoursesWrapper";
import FiltersWrapper from "@/features/allcourses/components/FiltersWrapper";

const CoursesPage = () => {
    return (
        <div className="flex gap-6">
            <CoursesWrapper />
            <FiltersWrapper />
        </div>
    );
};

export default CoursesPage;

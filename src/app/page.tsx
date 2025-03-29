import FeaturedCourses from "@/components/pages/Home/FeaturedCourses/FeaturedCourses";
import Hero from "@/components/pages/Home/Hero/Hero";

export default async function Home() {
    return (
        <div className="flex flex-col gap-24">
            <Hero />
            <FeaturedCourses />
        </div>
    );
}

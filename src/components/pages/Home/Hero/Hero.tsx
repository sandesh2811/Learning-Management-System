import HeroHeadings from "./HeroHeadings";
import HeroButton from "./HeroButton";

const Hero = () => {
    return (
        <main className="bg-primary-text/10 flex min-h-[50vh] flex-col items-center justify-center gap-6 rounded-2xl p-4 text-center backdrop-blur-xs">
            {/* Title and sub title */}
            <HeroHeadings />

            {/* CTA Button */}
            <HeroButton link="/courses" text="Explore our courses" />
        </main>
    );
};

export default Hero;

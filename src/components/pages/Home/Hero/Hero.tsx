import CtaButton from "@/components/shared/ctaButton";
import HeroHeadings from "./HeroHeadings";

const Hero = () => {
    return (
        <main className="bg-secondary-background flex min-h-[50vh] flex-col items-center justify-center gap-6 rounded-2xl p-4 text-center">
            {/* Title and sub title */}
            <HeroHeadings />

            {/* CTA Button */}
            <CtaButton link="/courses" text="Explore our courses" />
        </main>
    );
};

export default Hero;

"use client";

import { HeroHeadingVariant, FadeInVariant } from "@/animation/variants";
import { motion as m } from "motion/react";

const heading = "Teaching learning process made easy and interactive";

const HeroHeadings = () => {
    return (
        <div data-testid="hero-headings-parent" className="flex flex-col gap-1">
            <h1 className="flex flex-wrap justify-center gap-2 overflow-hidden">
                {heading.split(" ").map((heading, idx) => (
                    <m.span
                        key={idx}
                        custom={idx}
                        variants={HeroHeadingVariant}
                        initial="initial"
                        animate="enter"
                        className="text-[clamp(2.5rem,4vw+1rem,4rem)] leading-[clamp(3rem,4.8vw+1rem,4.48rem)] font-bold tracking-tight capitalize"
                    >
                        {heading}
                    </m.span>
                ))}
            </h1>

            <div className="flex justify-center overflow-hidden">
                <m.span
                    variants={FadeInVariant}
                    initial="initial"
                    animate="enter"
                    className="text-[clamp(1rem,0.2vw+1rem,1.1rem)]"
                >
                    Study from the industry professionals and level up your
                    skills.
                </m.span>
            </div>
        </div>
    );
};

export default HeroHeadings;

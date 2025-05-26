"use client";

import { motion as m } from "motion/react";
import { FadeInVariant, SlideRightOnHover } from "@/animation/variants";

import { GoArrowRight } from "react-icons/go";
import Link from "next/link";

type HeroButtonProps = {
    link: string;
    text: string;
};

const HeroButton = ({ link, text }: HeroButtonProps) => {
    return (
        <m.div
            data-testid="hero-button-parent"
            variants={FadeInVariant}
            initial="initial"
            animate="enter"
            whileHover="hover"
        >
            <Link
                className="bg-primary-text text-background flex cursor-pointer items-center justify-center gap-2 rounded-sm p-3 text-sm font-medium tracking-wide lg:text-lg"
                href={link}
            >
                {text}
                <m.span variants={SlideRightOnHover}>
                    <GoArrowRight data-testid="arrow-right-icon" size={22} />
                </m.span>
            </Link>
        </m.div>
    );
};

export default HeroButton;

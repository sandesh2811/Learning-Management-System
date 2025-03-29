"use client";

import useDetermineScreenSize from "@/hooks/useDetermineScreenSize";

import Button from "@/components/ui/Button";

import { GoArrowRight } from "react-icons/go";
import Link from "next/link";

import { motion as m } from "motion/react";
import { FadeInVariant, SlideRight } from "@/animation/variants";

type CtaButtonProps = {
    link: string;
    text: string;
};

const CtaButton = ({ link, text }: CtaButtonProps) => {
    const screenSize = useDetermineScreenSize();

    return (
        <m.div
            variants={FadeInVariant}
            initial="initial"
            animate="enter"
            whileHover="hover"
        >
            <Link href={link}>
                <Button
                    size={
                        screenSize === "xs"
                            ? "sm"
                            : screenSize === "lg"
                              ? "md"
                              : "md"
                    }
                >
                    {text}
                    <m.span variants={SlideRight}>
                        <GoArrowRight size={22} />
                    </m.span>
                </Button>
            </Link>
        </m.div>
    );
};

export default CtaButton;

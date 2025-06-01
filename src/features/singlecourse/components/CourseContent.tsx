"use client";

import { AccordianVariant, LoopUpDownVariant } from "../animation/variants";

import SectionMainHeading from "./SectionMainHeading";

import { useState } from "react";
import { GoArrowDown, GoChevronDown } from "react-icons/go";
import { AnimatePresence, motion as m } from "motion/react";

type AccordianState = {
    accordianId: null | number;
};

const CourseContentContainer = () => {
    return (
        <div className="bg-secondary-background relative overflow-hidden rounded-xl p-6 md:flex-1/5 lg:flex-1/3">
            <m.div
                variants={LoopUpDownVariant}
                initial="initial"
                animate="animate"
                className="absolute right-2 bottom-15"
            >
                <GoArrowDown size={25} />
            </m.div>

            <div className="h-[50vh]">
                <SectionMainHeading title="Course Structure" />
                <div className="divide-primary-text h-full divide-y-[1.2px] overflow-y-auto">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <CourseContent key={idx} index={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseContentContainer;

/* SINGLE COURSE COMPONENT */

const CourseContent = ({ index }: { index: number }) => {
    const [isActive, setActive] = useState<AccordianState>({
        accordianId: null,
    });

    // Here the course content id will be used temporary usage of index
    const setAccordianActive = (id: number) => () => {
        setActive({
            accordianId: isActive.accordianId === id ? null : id,
        });
    };

    return (
        <div
            className="mid:mr-4 relative cursor-pointer py-6 md:mr-6"
            onClick={setAccordianActive(index)}
        >
            <div className="flex flex-col gap-2">
                <h5 className="font-medium">
                    {index + 1}: Introduction to NestJS
                </h5>
                <AnimatePresence>
                    {isActive.accordianId === index && (
                        <m.p
                            variants={AccordianVariant}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="text-sm"
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nesciunt nam iste enim dolore
                        </m.p>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute top-7 right-0 flex justify-end">
                <GoChevronDown size={22} />
            </div>
        </div>
    );
};

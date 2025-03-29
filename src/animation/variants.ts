/* NAVBAR */

export const SlideDownVariant = {
    initial: {
        top: "-100%",
    },

    enter: {
        top: 0,
        transition: {
            duration: 0.8,
            ease: "easeInOut",
            staggerChildren: 0.12,
        },
    },

    exit: {
        top: "-100%",
        transition: {
            duration: 0.8,
            ease: "easeInOut",
        },
    },
};

/* HERO SECTION */

export const HeroHeadingVariant = {
    initial: {
        opacity: 0,
        y: "250%",
    },
    enter: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: [0.65, 0, 0.35, 1],
            delay: 0.082 * i,
        },
    }),
};

export const FadeInVariant = {
    initial: {
        opacity: 0,
        x: 0,
    },
    enter: {
        opacity: 1,
        transition: {
            duration: 1.28,
            ease: [0.65, 0, 0.35, 1],
            delay: 0.9,
        },
    },
};

export const SlideRight = {
    hover: {
        x: 2.5,
        duration: 0.8,
        ease: [0.65, 0, 0.35, 1],
    },
};

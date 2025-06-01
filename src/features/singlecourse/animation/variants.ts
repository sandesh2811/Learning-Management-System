/* FOR SCROLL ARROW INDICATOR */
export const LoopUpDownVariant = {
    initial: {
        y: 0,
    },

    animate: {
        y: [0, 15, 0],
        transition: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 1.5,
            ease: "easeInOut",
        },
    },
};

/* FOR ACCORDIAN ENTER AND EXIT */
export const AccordianVariant = {
    initial: {
        opacity: 0,
        height: 0,
        filter: "blur(5px)",
    },
    animate: {
        opacity: 1,
        height: "auto",
        filter: "blur(0px)",
        transition: {
            duration: 0.1,
            ease: "easeInOut",
        },
    },
    exit: {
        opacity: 0,
        height: 0,
        filter: "blur(5px)",

        transition: {
            duration: 0.1,
            ease: "easeInOut",
        },
    },
};

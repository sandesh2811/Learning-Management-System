/* FOR NOTIFICATION CONTAINER */

export const NotificationsVariant = {
    initial: {
        opacity: 0,
        filter: "blur(4px)",
        y: 5,
    },
    animate: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,

        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
    exit: {
        opacity: 0,
        filter: "blur(4px)",
        y: 5,

        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
};

/* FOR RATING MODAL */

export const RatingModalVariant = {
    initial: {
        opacity: 0,
        filter: "blur(5px)",
    },

    animate: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },

    exit: {
        opacity: 0,
        filter: "blur(5px)",
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
    },
};

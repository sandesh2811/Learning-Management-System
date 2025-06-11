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

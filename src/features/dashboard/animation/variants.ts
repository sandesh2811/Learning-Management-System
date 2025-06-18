export const ConfirmationModalVariant = {
    initial: {
        opacity: 0,
    },

    animate: {
        opacity: 1,
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
    },

    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
    },
};

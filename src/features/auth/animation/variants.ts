export const LoginModalVariant = {
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
};

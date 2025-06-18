export const SettingsVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.2,
            ease: "ease-in-out",
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: "ease-in-out",
            },
        },
    },
};

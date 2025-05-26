import { useEffect, useState } from "react";

type ScreenSizes = "xs" | "sm" | "md" | "lg";

export const useDetermineScreenSize = (): ScreenSizes | null => {
    const [screenSize, setScreenSize] = useState<ScreenSizes | null>(null);

    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth < 640) return setScreenSize("xs");
            if (window.innerWidth < 768) return setScreenSize("sm");
            if (window.innerWidth < 1024) return setScreenSize("md");
            if (window.innerWidth < 1280) return setScreenSize("lg");
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return screenSize;
};

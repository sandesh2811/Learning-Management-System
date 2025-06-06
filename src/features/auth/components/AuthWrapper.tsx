import { PropsWithChildren } from "react";

type AuthWrapperProps = {
    type: string;
} & PropsWithChildren;

const AuthWrapper = ({ children, type }: AuthWrapperProps) => {
    return (
        <div
            className={`bg-secondary-background flex justify-center rounded-2xl md:${type === "login" ? "h-[60vh] py-12" : "h-[80vh] py-8"} md:items-center`}
        >
            <div className="bg-background/70 flex w-full flex-col gap-4 rounded-md p-8 backdrop-blur-lg md:min-h-[40vh] md:max-w-[600px]">
                {children}
            </div>
        </div>
    );
};

export default AuthWrapper;

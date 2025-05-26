"use client";

const error = () => {
    return (
        <div className="flex h-[57vh] items-center justify-center">
            <div className="flex h-full flex-col items-center justify-center">
                <h3 className="text-red-500 md:text-xl">
                    Looks like something went wrong 🤔
                </h3>
                <span className="md:text-xl">Please try again later!</span>
            </div>
        </div>
    );
};

export default error;

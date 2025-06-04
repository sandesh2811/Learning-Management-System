import React from "react";

const Headings = () => {
    return (
        <div className="mid:text-center flex flex-col items-center justify-center gap-2">
            <h3 className="mid:text-4xl text-3xl font-medium tracking-tight md:text-5xl">
                Oops! Looks like the payment process failed
            </h3>
            {/* <p className="text-primary-text/80 text-lg md:text-xl">
                        You can retry the payment process to continue the
                        enrollment process
                    </p> */}
        </div>
    );
};

export default Headings;

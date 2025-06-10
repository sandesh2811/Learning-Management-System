interface HeadingsProps {
    fullname: string;
    updatedAt: string;
}

const Headings = ({ fullname, updatedAt }: HeadingsProps) => {
    const date = new Date(updatedAt).toDateString();

    return (
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <div>
                <h2 className="mid:text-2xl text-xl font-semibold">
                    Welcome {fullname}!
                </h2>
                <p className="mid:text-base text-primary-text/80 text-sm">
                    Customize your profile to provide more information about
                    yourselves
                </p>
            </div>
            <span className="mid:text-base text-sm">
                Profile last updated on: <b>{date}</b>
            </span>
        </div>
    );
};

export default Headings;

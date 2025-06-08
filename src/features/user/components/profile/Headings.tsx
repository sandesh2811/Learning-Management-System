interface HeadingsProps {
    fullname: string;
}

const Headings = ({ fullname }: HeadingsProps) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold">Welcome {fullname}!</h2>
            <p className="text-primary-text/80">
                Customize your profile to provide more information about
                yourselves
            </p>
        </div>
    );
};

export default Headings;

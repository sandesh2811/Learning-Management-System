interface SectionMainHeadingProps {
    title: string;
}

const SectionMainHeading = ({ title }: SectionMainHeadingProps) => {
    return (
        <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
            {title}
        </h3>
    );
};

export default SectionMainHeading;

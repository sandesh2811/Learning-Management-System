interface HeadingProps {
    text: string;
}

const Heading = ({ text }: HeadingProps) => {
    return (
        <div>
            <h2 className="text-[clamp(2rem,5vw+1rem,3rem)] font-semibold tracking-tighter capitalize">
                {text}
            </h2>
        </div>
    );
};

export default Heading;

interface FormHeadProps {
    title: string;
    description: string;
}

const FormHeader = ({ title, description }: FormHeadProps) => {
    return (
        <div data-testid="form-header-parent" className="flex justify-between">
            <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold md:text-2xl">{title}</h3>

                <p className="text-sm font-light md:text-base">{description}</p>
            </div>
        </div>
    );
};

export default FormHeader;

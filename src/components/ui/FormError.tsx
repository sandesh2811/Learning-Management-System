interface FormErrorProps {
    error: string | undefined;
}

const FormError = ({ error }: FormErrorProps) => {
    return (
        <>
            {error && (
                <span className="mid:text-sm text-error-text text-xs">
                    {error}
                </span>
            )}
        </>
    );
};

export default FormError;

import FormHeader from "@/features/auth/components/FormHeader";
import EnrollForm from "./EnrollForm";

const EnrollFormWrapper = () => {
    return (
        <div className="bg-secondary-background mid:px-6 flex min-h-[55vh] w-full flex-col justify-center gap-4 rounded-md px-4 py-6 md:items-center">
            <div className="md:bg-background/70 flex h-full flex-col gap-4 rounded-md md:min-h-[45vh] md:w-[550px] md:p-6">
                <FormHeader
                    title="Enrollment Form"
                    description="Please fill out necessary fields!"
                />
                <EnrollForm />
            </div>
        </div>
    );
};

export default EnrollFormWrapper;

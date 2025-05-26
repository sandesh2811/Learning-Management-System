import AuthWrapper from "@/features/auth/components/AuthWrapper";
import FormHeader from "@/features/auth/components/FormHeader";
import FormBody from "@/features/auth/components/register/Form";

const Register = () => {
    return (
        <AuthWrapper type="register">
            <FormHeader
                title="Register"
                description="Please enter all the fields to register successfully in Learn Nepal"
            />
            <FormBody />
        </AuthWrapper>
    );
};

export default Register;

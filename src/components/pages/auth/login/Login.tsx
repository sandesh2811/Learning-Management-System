import AuthWrapper from "@/features/auth/components/AuthWrapper";
import FormHeader from "@/features/auth/components/FormHeader";
import FormBody from "@/features/auth/components/login/Form";

const Login = () => {
    return (
        <AuthWrapper type="login">
            <FormHeader
                title="Welcome back!"
                description="Please enter your username and password to login to your account"
            />
            <FormBody />
        </AuthWrapper>
    );
};

export default Login;

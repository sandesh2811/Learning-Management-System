import UserProfilePage from "@/components/pages/user/UserProfile";
import { ErrorBoundaryWrapper } from "@/components/shared/ErrorBoundary";
import { Suspense } from "react";

const UserProfile = async ({ params }: ParamsProp<{ username: string }>) => {
    const { username } = await params;

    return (
        <ErrorBoundaryWrapper showButton={false}>
            <Suspense fallback={<div>Loadingg.....</div>}>
                <UserProfilePage username={username} />;
            </Suspense>
        </ErrorBoundaryWrapper>
    );
};

export default UserProfile;

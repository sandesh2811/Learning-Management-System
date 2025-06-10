import UserProfilePage from "@/components/pages/user/UserProfile";
import { ErrorBoundaryWrapper } from "@/components/shared/ErrorBoundary";
import ProfileLoading from "@/features/user/components/profile/ProfileLoading";

import { Suspense } from "react";

const UserProfile = async ({ params }: ParamsProp<{ username: string }>) => {
    const { username } = await params;

    return (
        <Suspense fallback={<ProfileLoading />}>
            <ErrorBoundaryWrapper showButton={false}>
                <UserProfilePage username={username} />
            </ErrorBoundaryWrapper>
        </Suspense>
    );
};

export default UserProfile;

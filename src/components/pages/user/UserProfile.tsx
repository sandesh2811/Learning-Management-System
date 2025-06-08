import { getUserProfileData } from "@/features/user/api/getUserProfileData";

import Headings from "@/features/user/components/profile/Headings";
import Profile from "@/features/user/components/profile/Profile";

interface UserProfilePageProps {
    username: string;
}

const UserProfilePage = async ({ username }: UserProfilePageProps) => {
    /* Get user data for profile */
    const { success, message, userProfileData } =
        await getUserProfileData(username);

    if (!success) {
        return <span>{message}</span>;
    }

    return (
        <div className="bg-secondary-background min-h-[50vh] rounded-md p-6">
            <div className="flex flex-col gap-8">
                <Headings fullname={userProfileData.fullname} />
                <Profile userProfileData={userProfileData} />
            </div>
        </div>
    );
};

export default UserProfilePage;

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

    if (!userProfileData || !success) {
        return <span className="font-light md:text-xl">{message}</span>;
    }

    return (
        <div className="bg-secondary-background mid:p-6 min-h-[50vh] rounded-md p-4">
            <div className="mid:gap-8 flex flex-col gap-4">
                <Headings
                    fullname={userProfileData.fullname}
                    updatedAt={userProfileData.updatedAt}
                />
                <Profile userProfileData={userProfileData} />
            </div>
        </div>
    );
};

export default UserProfilePage;

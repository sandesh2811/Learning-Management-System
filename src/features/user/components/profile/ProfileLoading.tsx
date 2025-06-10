const ProfileLoading = () => {
    return (
        <div className="bg-secondary-background mid:p-6 min-h-[50vh] rounded-md p-4">
            <div className="mid:gap-8 flex flex-col gap-4">
                <HeadingsLoading />
                <UserProfileDataLoading />
            </div>
        </div>
    );
};

export default ProfileLoading;

/* FOR HEADINGS */

const HeadingsLoading = () => {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <div className="flex flex-col gap-3">
                <span className="bg-primary-text/20 h-[25px] w-[250px] animate-pulse rounded-sm" />
                <span className="bg-primary-text/20 mid:w-[500px] h-[20px] animate-pulse rounded-sm" />
            </div>
            <span className="bg-primary-text/20 mid:w-[300px] h-[20px] w-[200px] animate-pulse rounded-sm" />
        </div>
    );
};

/* FOR UPDATE FORM */
const UserProfileDataLoading = () => {
    return (
        <div className="bg-background flex flex-col gap-8 rounded-md p-6">
            {/* USERNAME AND FULLNAME */}
            <div className="mid:flex-row flex flex-col justify-between gap-6">
                <div className="mid:w-[50%] flex w-full flex-col gap-2">
                    <div className="flex w-full flex-col gap-2">
                        <span className="bg-primary-text/20 h-[20px] w-[100px] animate-pulse rounded-sm" />

                        <span className="bg-primary-text/20 h-[30px] w-full animate-pulse rounded-sm" />
                    </div>
                    <span className="bg-primary-text/20 h-[15px] w-[200px] animate-pulse rounded-sm" />
                </div>
                <div className="mid:w-[50%] flex w-full flex-col gap-2">
                    <div className="flex w-full flex-col gap-2">
                        <span className="bg-primary-text/20 h-[20px] w-[100px] animate-pulse rounded-sm" />

                        <span className="bg-primary-text/20 h-[30px] w-full animate-pulse rounded-sm" />
                    </div>
                    <span className="bg-primary-text/20 h-[15px] w-[200px] animate-pulse rounded-sm" />
                </div>
            </div>

            {/* EMAIL AND CONTACT NUMBER */}
            <div className="mid:flex-row flex flex-col justify-between gap-6">
                <div className="mid:w-[50%] flex w-full flex-col gap-2">
                    <div className="flex w-full flex-col gap-2">
                        <span className="bg-primary-text/20 h-[20px] w-[100px] animate-pulse rounded-sm" />

                        <span className="bg-primary-text/20 h-[30px] w-full animate-pulse rounded-sm" />
                    </div>
                </div>
                <div className="mid:w-[50%] flex w-full flex-col gap-2">
                    <div className="flex w-full flex-col gap-2">
                        <span className="bg-primary-text/20 h-[20px] w-[100px] animate-pulse rounded-sm" />

                        <span className="bg-primary-text/20 h-[30px] w-full animate-pulse rounded-sm" />
                    </div>
                </div>
            </div>

            {/* ABOUT */}
            <div className="mid:flex-row flex flex-col justify-between gap-6">
                <div className="mid:w-[50%] flex w-full flex-col gap-2">
                    <div className="flex w-full flex-col gap-2">
                        <span className="bg-primary-text/20 h-[20px] w-[100px] animate-pulse rounded-sm" />

                        <span className="bg-primary-text/20 h-[30px] w-full animate-pulse rounded-sm" />
                    </div>
                    <span className="bg-primary-text/20 h-[15px] w-[200px] animate-pulse rounded-sm" />
                </div>
                <div className="mid:w-[50%] flex w-full flex-col gap-2">
                    <div className="flex w-full flex-col gap-2">
                        <span className="bg-primary-text/20 h-[20px] w-[100px] animate-pulse rounded-sm" />

                        <span className="bg-primary-text/20 h-[30px] w-full animate-pulse rounded-sm" />
                    </div>
                </div>
            </div>

            {/* BUTTONS */}
            <div className="flex w-full flex-col gap-2">
                <div className="flex w-full flex-col gap-2">
                    <span className="bg-primary-text/20 h-[20px] w-[100px] animate-pulse rounded-sm" />

                    <span className="bg-primary-text/20 h-[50px] w-full animate-pulse rounded-sm" />
                </div>
            </div>

            <div className="mid:justify-end flex justify-between gap-4">
                <span className="bg-primary-text/20 h-[45px] w-[150px] animate-pulse rounded-sm" />
                <span className="bg-primary-text/20 h-[45px] w-[150px] animate-pulse rounded-sm" />
            </div>
        </div>
    );
};

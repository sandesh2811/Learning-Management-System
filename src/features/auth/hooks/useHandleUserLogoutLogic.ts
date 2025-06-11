import { logoutUser } from "@/features/auth/api/LogoutUser";

import {
    loggedInUserInitialState,
    loggedInUserInfo,
} from "@/store/user/loggedInUserInfo";
import {
    selectedCourse,
    selectedCourseInitialState,
} from "@/store/selectedCourse/selectedCourse";

import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useHandleUserLogoutLogic = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        const { success, message } = await logoutUser();

        if (success) {
            if (pathname !== "/") {
                router.push("/");

                toast.success(message);

                dispatch(loggedInUserInfo(loggedInUserInitialState));
                dispatch(selectedCourse(selectedCourseInitialState));
            } else {
                toast.success(message);

                dispatch(loggedInUserInfo(loggedInUserInitialState));
                dispatch(selectedCourse(selectedCourseInitialState));
            }
        } else {
            toast.error(message);
        }
    };

    return {
        handleLogout,
    };
};

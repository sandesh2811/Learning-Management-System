import { EnrollFormType } from "../schemas/enrollFormSchema";

import { userInfoForEnrollment } from "@/store/enrollForm/userInfoForEnrollment";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useHandleFormSubmit = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [isRedirecting, setRedirecting] = useState<boolean>(false);

    const handleFormSubmit = (data: EnrollFormType) => {
        setRedirecting(true);
        setTimeout(() => {
            dispatch(
                userInfoForEnrollment({
                    fullname: data.fullname,
                    email: data.email,
                    paymentMethod: data.paymentMethod,
                })
            );

            setRedirecting(false);
            router.push("/confirmation");
        }, 1500);
    };

    return {
        isRedirecting,
        handleFormSubmit,
    };
};

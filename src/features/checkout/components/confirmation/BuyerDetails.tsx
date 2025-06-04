import { RootState } from "@/store/Store";
import { useSelector } from "react-redux";

const BuyerDetails = () => {
    const userInfoForEnrollment = useSelector(
        (state: RootState) => state.userInfoForEnrollment
    );

    return (
        <div className="flex flex-col gap-1">
            <h4 className="text-lg font-semibold">Your Details</h4>
            <div className="flex flex-col gap-2">
                <span>Fullname: {userInfoForEnrollment.fullname}</span>
                <span>Email: {userInfoForEnrollment.email}</span>
                <span>
                    Payment Method:
                    {userInfoForEnrollment.paymentMethod}
                </span>
            </div>
        </div>
    );
};

export default BuyerDetails;

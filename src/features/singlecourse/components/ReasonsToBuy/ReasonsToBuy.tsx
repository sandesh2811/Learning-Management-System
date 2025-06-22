import { type CartItem } from "@/store/cart/cartItems";

import CallToActionButtons from "./CallToActionButtons";
import SectionMainHeading from "../SectionMainHeading";

interface ReasonsToBuyTheCourseProps {
    studentsEnrolled: string[];
    languagesAvailable: string[];
    cartItemInfo: CartItem;
}

const ReasonsToBuyTheCourse = ({
    studentsEnrolled,
    languagesAvailable,
    cartItemInfo,
}: ReasonsToBuyTheCourseProps) => {
    return (
        <div className="bg-secondary-background flex flex-1 flex-col justify-between gap-4 rounded-xl p-6">
            <div className="flex flex-col gap-2">
                <SectionMainHeading title="Why buy this course?" />

                <ul className="ml-5 flex list-disc flex-col gap-2">
                    <li>
                        {studentsEnrolled.length === 0
                            ? 0
                            : studentsEnrolled.length}{" "}
                        students enrolled
                    </li>
                    <li>Chat support for guidence</li>
                    <li>
                        Available in{" "}
                        {languagesAvailable
                            .map((languages) => languages)
                            .join(", ")}
                    </li>
                </ul>
            </div>

            <CallToActionButtons cartItemInfo={cartItemInfo} />
        </div>
    );
};

export default ReasonsToBuyTheCourse;

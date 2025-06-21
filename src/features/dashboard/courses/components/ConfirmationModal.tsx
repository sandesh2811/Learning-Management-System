import { ConfirmationModalVariant } from "../animation/variants";

import { deleteCourse } from "../api/deleteCourse";

import Button from "@/components/ui/Button";
import { Span } from "@/components/ui/Span";

import { toast } from "sonner";
import { GoX } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "@/store/Store";
import { motion as m } from "motion/react";

interface ConfirmationModalProps {
    selectedCourseId: string | null;
    setActiveStateFalse: () => void;
}

const ConfirmationModal = ({
    selectedCourseId,
    setActiveStateFalse,
}: ConfirmationModalProps) => {
    /* Get the logged in user */
    const loggedInUser = useSelector((state: RootState) => state.loggedinUser);

    /* Handle course deletion */
    const handleCourseDelete = async () => {
        if (!selectedCourseId) return;

        const { success, message } = await deleteCourse({
            courseId: selectedCourseId,
            username: loggedInUser.username,
        });

        if (success) {
            toast.success(message);
        } else {
            toast.error(message);
        }
    };

    return (
        <m.div
            variants={ConfirmationModalVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-primary-text/20 absolute top-0 left-0 flex h-screen w-full items-center justify-center px-4 backdrop-blur-sm"
        >
            <div className="bg-background shadow-primary-text/5 mid:w-[550px] mid:p-6 min-h-[25vh] w-full justify-between rounded-md p-4 shadow-xl md:w-[700px]">
                <div className="flex justify-end">
                    <Span onClick={setActiveStateFalse}>
                        <GoX size={22} />
                    </Span>
                </div>

                <div className="mid:gap-0 flex min-h-[20vh] flex-col justify-between gap-6">
                    <div className="flex flex-col justify-between">
                        <h5 className="text-xl font-semibold">
                            Are you sure you wan&apos;t delete this course?
                        </h5>
                        <span className="text-primary-text/80 text-sm">
                            Please note that once the course is deleted it is
                            irreversible. This may affect the students who are
                            currently enrolled in this course.
                        </span>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            onClick={setActiveStateFalse}
                            className="w-[150px]"
                            variant="skeleton"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCourseDelete}
                            variant="danger"
                            className="w-[150px]"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </m.div>
    );
};

export default ConfirmationModal;

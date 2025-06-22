import { RootState } from "@/store/Store";
import { useSelector } from "react-redux";

const CourseDetails = () => {
    /* Get the cart items */
    const cartItems = useSelector((state: RootState) => state.cartItems);

    return (
        <div className="flex flex-col gap-3">
            <h4 className="text-xl font-semibold">Course Details</h4>

            <div className="divide-primary-text/10 flex flex-col gap-6 divide-y-[1.2px]">
                {cartItems.map((cartItem, idx) => (
                    <div key={idx} className="flex flex-col gap-2 pb-2">
                        <span>
                            <b>Course Name</b>: {cartItem.title}
                        </span>
                        <span>
                            <b>Price</b>: Rs {cartItem.price}
                        </span>
                        <span>
                            <b>Duration</b>: {cartItem.duration}
                        </span>
                        <span>
                            <b>Instructor</b>: {cartItem.instructorName}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseDetails;

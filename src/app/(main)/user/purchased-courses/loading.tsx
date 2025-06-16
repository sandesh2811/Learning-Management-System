import PurchasedCourseLoading from "@/features/user/components/purchasedCourses/PurchasedCourseLoading";

const loading = () => {
    return (
        <div className="mid:px-4 flex h-[56vh] flex-col gap-4">
            <span className="bg-primary-text/20 h-[30px] w-[300px] animate-pulse rounded-sm" />

            <PurchasedCourseLoading />
        </div>
    );
};

export default loading;

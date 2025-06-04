import ButtonContainer from "@/features/checkout/components/paymentFailed/ButtonContainer";
import Headings from "@/features/checkout/components/paymentFailed/Headings";

const PaymentFailedPage = () => {
    return (
        <div className="flex min-h-[55vh] items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-6">
                <Headings />
                <ButtonContainer />
            </div>
        </div>
    );
};

export default PaymentFailedPage;

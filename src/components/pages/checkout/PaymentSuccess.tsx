import Invoice from "@/features/checkout/components/paymentSuccess/invoice/Invoice";
import StatusCheckAndOrderUpdate from "@/features/checkout/components/paymentSuccess/StatusCheckAndOrderUpdate";

const PaymentSuccessPage = () => {
    return (
        <div className="min-h-[75vh]">
            <Invoice />

            {/* ONLY FOR UPDATING ORDER STATUS. NO  JSX */}
            <StatusCheckAndOrderUpdate />
        </div>
    );
};

export default PaymentSuccessPage;

import CustomerDetails from "./CustomerDetails";
import InvoiceFooter from "./InvoiceFooter";
import OrderDetails from "./OrderDetails";

const Invoice = () => {
    return (
        <div className="bg-secondary-background mid:py-2 flex min-h-[75vh] justify-center rounded-md md:py-8">
            <div className="mid:bg-background divide-primary-text/50 flex w-[500px] flex-col justify-between gap-6 divide-y-[1.2px] overflow-hidden rounded-md p-6">
                <div className="pb-2 text-center">
                    <h3 className="text-2xl font-semibold">Invoice</h3>
                </div>

                <div className="flex min-h-[50vh] flex-col gap-4">
                    <CustomerDetails />
                    <OrderDetails />
                </div>
                <InvoiceFooter />
            </div>
        </div>
    );
};

export default Invoice;

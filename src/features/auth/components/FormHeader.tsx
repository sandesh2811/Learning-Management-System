import { useRouter } from "next/navigation";

import { GoX } from "react-icons/go";

type FormHeadProps = {
    title: string;
    description: string;
};

const FormHeader = ({ title, description }: FormHeadProps) => {
    const router = useRouter();

    return (
        <div className="flex justify-between">
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold md:text-2xl">
                        {title}
                    </h3>
                    <GoX
                        size={25}
                        onClick={() => router.back()}
                        className="cursor-pointer"
                    />
                </div>
                <p className="text-sm font-light text-balance md:text-base">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default FormHeader;
